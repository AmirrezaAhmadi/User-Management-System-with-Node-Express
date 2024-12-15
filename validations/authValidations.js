const { body } = require("express-validator");
const User = require("../models/user");

const auth = {
  register: [
    body("name")
    .notEmpty()
    .withMessage("name cannot be empty."),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long."),
  ],
  login: [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty."),
  ],
  changePassword: [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required."),
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("New password must be at least 5 characters long.")
      .not()
      .custom((value, { req }) => value === req.body.currentPassword)
      .withMessage("New password must be different from the current password."),
  ],
  resetPasswordRequest: [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
  ],
  resetPassword: [
    body("token")
      .notEmpty()
      .withMessage("Reset token is required."),
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("New password must be at least 5 characters long."),
  ],
};

module.exports = { auth };
