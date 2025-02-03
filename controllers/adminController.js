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

exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await user.save();
    res.status(201).json({ message: "User added successfully.", user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.editUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated successfully.", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

