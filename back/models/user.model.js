const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  confirmationCode: { type: String, unique: true },
  status: { type: String, enum: ["Pending", "Active"], default: "Pending" },
});

module.exports = mongoose.model("User", userSchema);
