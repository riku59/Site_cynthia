const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.getUserInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupère le token du header Authorization
    const decoded = jwt.verify(token, "your_jwt_secret");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Token is invalid or has expired");
    }

    user.emailVerified = true;
    user.verificationToken = undefined; // Clear the verification token
    user.verificationTokenExpires = undefined; // Clear the token expiration time
    await user.save();

    res.send("Email has been successfully verified.");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
