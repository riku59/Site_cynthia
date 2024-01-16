const express = require("express");
const router = express.Router();
const path = require("path"); // Ajout de cette ligne
const Article = require("../models/article"); // Modification de cette ligne

// Endpoint pour ajouter un nouvel article
router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Autres routes pour créer, mettre à jour, et supprimer des articles

module.exports = router;
