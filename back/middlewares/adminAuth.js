const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, "your_jwt_secret");

  if (decoded.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
