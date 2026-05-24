const express = require("express");
const { login, register } = require("../controllers/authController");
const { validateLogin, validateRegister } = require("../middleware/validateMiddleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
