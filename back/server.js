const express = require("express");
const mongoose = require("mongoose");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
const port = 3001;

mongoose.connect("mongodb://localhost:27017/Creation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Utiliser les routes d'article
app.use("/api", articleRoutes);

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
