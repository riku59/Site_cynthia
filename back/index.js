const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 5000;

//connexion a la base de donné

connectDB();

const app = express();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Activer CORS pour toutes les requêtes
const corsOptions = {
  origin: "http://localhost:3000", // Spécifiez l'URL de votre front-end
  credentials: true, // Pour accepter les cookies et les informations d'authentification
  optionsSuccessStatus: 200, // Pour les navigateurs plus anciens qui n'utilisent pas le statut par défaut 204
};

app.use(cors(corsOptions));

// MiddleWare qui permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // permet de lire les url uncoded  (postman)
app.use("/post", require("./routes/post.routes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api", cartRoutes);

// lancer le server
app.listen(port, () => {
  console.log(`serveur écoutant sur le port ${port}`);
});
