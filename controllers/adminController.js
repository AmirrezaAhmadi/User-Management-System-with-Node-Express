const User = require("../models/user");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
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
