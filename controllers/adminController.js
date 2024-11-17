const User = require('../models/user');

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: "No users found" }); // ارسال پاسخ و خروج
        }
        return res.status(200).json(users); // ارسال پاسخ موفق
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
 };