const express = require("express");
const { githubCallback, githubLogin, googleCallback, googleLogin, login, logout, refresh, register } = require("../controllers/authController");
const { validateLogin, validateRegister } = require("../middleware/validateMiddleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
