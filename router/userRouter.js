const express = require("express");
const authControllers = require("../controllers/userController");
const router = express.Router();
const { auth } = require("../validations/authValidations");
const isAuth = require("../middlewares/isAuth");

router.post("/register", auth.register, authControllers.signup);

router.post("/login", auth.login, authControllers.login);

router.post("/logout", authControllers.logout);

router.post("/profile", isAuth, authControllers.me);

router.post(
  "/update-password",
  isAuth,
  auth.changePassword,
  authControllers.changePassword
);

router.post(
  "/request-password-change",
  auth.resetPasswordRequest,
  authControllers.requestPasswordReset
);

router.post(
  "/reset-password",
  auth.resetPassword,
  authControllers.resetPassword
);

module.exports = router;
