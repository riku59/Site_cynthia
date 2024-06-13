const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.getUserInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupère le token du header Authorization
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utilisez la clé secrète de l'environnement
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
