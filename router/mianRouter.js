const express = require("express");
const authControllers = require("../controllers/authController");
const router = express.Router();
const { auth } = require("../validations/authValidations");

router.post("/register", auth.register, authControllers.signup);

router.post("/login", auth.login, authControllers.login);

module.exports = router;
