const User = require("../models/user");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res , next) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ 
      message: 'Validation failed.', 
      errors: errors.array() 
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
    });
    const result = await user.save();
    res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        return error;
      }
      loadedUser = user;
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        return error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log(process.env.JWT_SECRET)
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };