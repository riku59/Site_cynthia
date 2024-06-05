const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

//connexion a la base de donné

connectDB();

const app = express();

// MiddleWare qui permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // permet de lire les url uncoded  (postman)
app.use("/post", require("./routes/post.routes"));

// lancer le server
app.listen(port, () => {
  console.log(`serveur écoutant sur le port ${port}`);
});
