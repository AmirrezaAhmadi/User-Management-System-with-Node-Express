const express = require("express");
const authControllers = require("../controllers/authController");
const { body } = require("express-validator");
const User = require("../models/user");
const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authControllers.signup
);

router.post("/login", authControllers.login);

router.post("/logout");

router.get("/profile");

//Edit Profile
router.put("/profile");

router.delete("/profile");

router.post("/forgot-password");

router.post("/reset-password");

module.exports = router;
