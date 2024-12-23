const User = require("../models/user");

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error." });
    }
  };
};

module.exports = { checkRole };
