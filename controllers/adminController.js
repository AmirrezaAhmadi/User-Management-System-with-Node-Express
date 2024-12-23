const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -refreshTokens");
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getOneUser = async (req, res) => {
  const userId = req.params;
  try {
    const user = await User.findById(userId.id);
    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
       res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
