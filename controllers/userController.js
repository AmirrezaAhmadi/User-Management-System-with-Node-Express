const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed.",
      errors: errors.array(),
    });
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      name : name,
      email: email,
      password: hashedPw,
    });
    const result = await user.save();
    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed.",
      errors: errors.array(),
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      return next(error);
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      return next(error);
    }

    user.refreshTokens = user.refreshTokens.filter((token) => {
      try {
        jwt.verify(token, process.env.REFRESHTOKEN_KEY);
        return true;
      } catch (err) {
        return false;
      }
    });

    const accessToken = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.ACCESSTOKEN_KEY,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.REFRESHTOKEN_KEY,
      { expiresIn: "7d" }
    );

    user.refreshTokens.push(refreshToken);
    await user.save();

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.logout = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  try {
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh Token is required." });
    }

    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid Refresh Token." });
    }

    user.refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);
    await user.save();

    res.status(200).json({ message: "Logged out successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.me = async (req, res) => {
  try {
    const name = req.body.name;
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "User info retrieved successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
