const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Vérifier que l'utilisateur est admin
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupère le token du header Authorization
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (user && user.role === "admin") {
      req.user = user;
      next(); // Si l'utilisateur est admin, continuez
    } else {
      res.status(403).json({ message: "Access forbidden: Admins only" });
    }
  } catch (error) {
    res.status(403).json({ message: "Access forbidden: Admins only" });
  }
};
