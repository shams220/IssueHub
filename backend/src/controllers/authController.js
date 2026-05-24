const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
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

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = {
  register,
  login,
};
