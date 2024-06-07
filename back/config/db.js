const mongoose = require("mongoose");

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI)
      .then((result) => console.log("Mongo connecté"));
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

module.exports = connectDB;
