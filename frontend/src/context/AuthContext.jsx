import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import api, { ACCESS_TOKEN_KEY } from "../services/api";

const AuthContext = createContext();
const USER_STORAGE_KEY = "issuehub_user";
const FIRST_VISIT_STORAGE_KEY = "issuehub_first_visit_used";
const GUEST_SESSION_KEY = "issuehub_guest_visit_active";

function getSavedUser() {
  try {
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }

    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

function hasActiveGuestVisit() {
  if (sessionStorage.getItem(GUEST_SESSION_KEY) === "true") {
    return true;
  }

  return false;
}

function claimFirstVisit() {
  if (hasActiveGuestVisit()) {
    return true;
  }

  if (!localStorage.getItem(FIRST_VISIT_STORAGE_KEY)) {
    localStorage.setItem(FIRST_VISIT_STORAGE_KEY, "true");
    sessionStorage.setItem(GUEST_SESSION_KEY, "true");
    return true;
  }

  return false;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSavedUser());

  function persistSession(userData, accessToken) {
    setUser(userData);
    sessionStorage.removeItem(GUEST_SESSION_KEY);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  function completeOAuthLogin(userData, accessToken) {
    persistSession(userData, accessToken);
    toast.success("Login successful");
  }

  async function login(credentials) {
    const response = await api.post("/auth/login", credentials);
    persistSession(response.data.user, response.data.accessToken);
    toast.success("Login successful");
    return response.data.user;
  }

  async function register(userData) {
    const response = await api.post("/auth/register", userData);
    persistSession(response.data.user, response.data.accessToken);
    toast.success("Registration successful");
    return response.data.user;
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch {
      // Local logout should still complete even if the server is unreachable.
    }

    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(GUEST_SESSION_KEY);
    toast.success("Logged out");
  }

  const value = {
    user,
    isLoggedIn: Boolean(user),
    isFirstVisitAllowed: !user && hasActiveGuestVisit(),
    claimFirstVisit,
    completeOAuthLogin,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
