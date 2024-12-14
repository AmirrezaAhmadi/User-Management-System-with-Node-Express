const express = require("express");
const authControllers = require("../controllers/userController");
const router = express.Router();
const { auth } = require("../validations/authValidations");
const isAuth = require('../middleware/isAuth');

router.post("/register", auth.register, authControllers.signup);

router.post("/login", auth.login, authControllers.login);

router.post('/logout', authControllers.logout);

router.post('/me' ,  isAuth ,authControllers.me);

router.post("/change-password", isAuth, authControllers.changePassword);

router.post("/password-reset/request", authControllers.requestPasswordReset);

router.post("/password-reset", authControllers.resetPassword);

module.exports = router;
