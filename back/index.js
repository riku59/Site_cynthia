const express = require("express");

const port = process.env.PORT || 5000;

const app = express();

// MiddleWare qui permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/post", require("./routes/post.routes"));

// lancer le server
app.listen(port, () => {
  console.log(`serveur écoutant sur le port ${port}`);
});
