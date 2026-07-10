const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

const REFRESH_COOKIE_NAME = "issuehub_refresh_token";
const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";
const GITHUB_EMAILS_URL = "https://api.github.com/user/emails";
const GOOGLE_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USER_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

function getRefreshCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function getClearRefreshCookieOptions() {
  const { maxAge, ...cookieOptions } = getRefreshCookieOptions();
  return cookieOptions;
}

function sendAuthResponse(res, statusCode, message, user) {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());

  res.status(statusCode).json({
    success: true,
    message,
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

function getClientRedirectUrl() {
  return process.env.CLIENT_URL || "http://localhost:5173";
}

function getServerCallbackUrl(req, provider) {
  if (provider === "google") {
    return process.env.GOOGLE_CALLBACK_URL || `${req.protocol}://${req.get("host")}/api/auth/google/callback`;
  }

  return process.env.GITHUB_CALLBACK_URL || `${req.protocol}://${req.get("host")}/api/auth/github/callback`;
}

function hasOAuthConfig(provider) {
  if (provider === "google") {
    return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  }

  return Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);
}

function redirectToOAuthError(res, message) {
  const redirectUrl = new URL("/auth/callback", getClientRedirectUrl());
  redirectUrl.searchParams.set("error", message);
  return res.redirect(redirectUrl.toString());
}

async function findOrCreateOAuthUser({ provider, providerId, name, email }) {
  let user = await User.findOne({ email });

  if (user) {
    user.authProvider = user.authProvider || provider;
    user.providerId = user.providerId || providerId;
    await user.save();
    return user;
  }

  return User.create({
    name,
    email,
    authProvider: provider,
    providerId,
  });
}

function redirectWithOAuthSession(res, user) {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const redirectUrl = new URL("/auth/callback", getClientRedirectUrl());

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());
  redirectUrl.searchParams.set("accessToken", accessToken);
  redirectUrl.searchParams.set("user", encodeURIComponent(JSON.stringify({
    id: user._id,
    name: user.name,
    email: user.email,
  })));

  return res.redirect(redirectUrl.toString());
}

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  sendAuthResponse(res, 201, "User registered successfully", user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  sendAuthResponse(res, 200, "Login successful", user);
});

const githubLogin = asyncHandler(async (req, res) => {
  if (!hasOAuthConfig("github")) {
    return redirectToOAuthError(res, "GitHub OAuth is not configured");
  }

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", getServerCallbackUrl(req, "github"));
  authorizeUrl.searchParams.set("scope", "read:user user:email");

  return res.redirect(authorizeUrl.toString());
});

const githubCallback = asyncHandler(async (req, res) => {
  if (!hasOAuthConfig("github")) {
    return redirectToOAuthError(res, "GitHub OAuth is not configured");
  }

  const { code } = req.query;

  if (!code) {
    return redirectToOAuthError(res, "GitHub authorization was cancelled");
  }

  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: getServerCallbackUrl(req, "github"),
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    return redirectToOAuthError(res, tokenData.error_description || "GitHub login failed");
  }

  const githubHeaders = {
    Authorization: `Bearer ${tokenData.access_token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "IssueHub",
  };

  const [profileResponse, emailsResponse] = await Promise.all([
    fetch(GITHUB_USER_URL, { headers: githubHeaders }),
    fetch(GITHUB_EMAILS_URL, { headers: githubHeaders }),
  ]);

  const profile = await profileResponse.json();
  const emails = emailsResponse.ok ? await emailsResponse.json() : [];
  const primaryEmail = Array.isArray(emails)
    ? emails.find((email) => email.primary && email.verified)?.email || emails.find((email) => email.verified)?.email
    : null;
  const email = profile.email || primaryEmail;

  if (!profileResponse.ok || !email) {
    return redirectToOAuthError(res, "GitHub account email is unavailable");
  }

  const user = await findOrCreateOAuthUser({
    provider: "github",
    providerId: String(profile.id),
    name: profile.name || profile.login,
    email,
  });

  return redirectWithOAuthSession(res, user);
});

const googleLogin = asyncHandler(async (req, res) => {
  if (!hasOAuthConfig("google")) {
    return redirectToOAuthError(res, "Google OAuth is not configured");
  }

  const authorizeUrl = new URL(GOOGLE_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", getServerCallbackUrl(req, "google"));
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "openid email profile");
  authorizeUrl.searchParams.set("prompt", "select_account");

  return res.redirect(authorizeUrl.toString());
});

const googleCallback = asyncHandler(async (req, res) => {
  if (!hasOAuthConfig("google")) {
    return redirectToOAuthError(res, "Google OAuth is not configured");
  }

  const { code } = req.query;

  if (!code) {
    return redirectToOAuthError(res, "Google authorization was cancelled");
  }

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: getServerCallbackUrl(req, "google"),
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    return redirectToOAuthError(res, tokenData.error_description || "Google login failed");
  }

  const profileResponse = await fetch(GOOGLE_USER_URL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/json",
    },
  });
  const profile = await profileResponse.json();

  if (!profileResponse.ok || !profile.email) {
    return redirectToOAuthError(res, "Google account email is unavailable");
  }

  const user = await findOrCreateOAuthUser({
    provider: "google",
    providerId: String(profile.id),
    name: profile.name || profile.email.split("@")[0],
    email: profile.email,
  });

  return redirectWithOAuthSession(res, user);
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];

  if (!refreshToken) {
    res.status(401);
    throw new Error("Refresh token missing");
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("Invalid refresh token");
  }

  res.status(200).json({
    success: true,
    accessToken: generateAccessToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie(REFRESH_COOKIE_NAME, getClearRefreshCookieOptions());

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = {
  register,
  login,
  githubLogin,
  githubCallback,
  googleLogin,
  googleCallback,
  refresh,
  logout,
};
