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
};

module.exports = { auth };
