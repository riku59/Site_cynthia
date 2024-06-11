const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const port = process.env.PORT || 5000;

//connexion a la base de donné

connectDB();

const app = express();

// Activer CORS pour toutes les requêtes
app.use(cors());

// MiddleWare qui permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // permet de lire les url uncoded  (postman)
app.use("/post", require("./routes/post.routes"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// lancer le server
app.listen(port, () => {
  console.log(`serveur écoutant sur le port ${port}`);
});
