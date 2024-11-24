const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  let accessToken;
  let refreshToken;

  if (authHeader) {
    accessToken = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
    accessToken = req.cookies.accessToken;
  }

  refreshToken = req.body.refreshToken || req.cookies?.refreshToken;
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "No tokens provided. Unauthorized." });
  }

  try {
    if (accessToken) {
      const decodedToken = jwt.verify(accessToken, process.env.ACCESSTOKEN_KEY);
      req.userId = decodedToken.userId;
      return next();
    }
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid Access Token." });
    }
  }

  try {
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token is missing." });
    }

    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESHTOKEN_KEY);

    const user = await User.findById(decodedRefreshToken.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid or mismatched Refresh Token." });
    }

    const newAccessToken = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      "access-super-secret-key",
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });

    req.userId = user._id.toString();
    return next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired Refresh Token." });
  }
};
