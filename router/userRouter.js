const express = require("express");
const authControllers = require("../controllers/userController");
const router = express.Router();
const { auth } = require("../validations/authValidations");
const isAuth = require("../middlewares/isAuth");

router.post("/register", auth.register, authControllers.signup);

router.post("/login", auth.login, authControllers.login);

router.post("/logout", authControllers.logout);

router.post("/me", isAuth, authControllers.me);

router.post(
  "/change-password",
  isAuth,
  auth.changePassword,
  authControllers.changePassword
);

router.post(
  "/password-reset/request",
  auth.resetPasswordRequest,
  authControllers.requestPasswordReset
);

router.post(
  "/password-reset",
  auth.resetPassword,
  authControllers.resetPassword
);

module.exports = router;
