const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/me", userController.getUserInfo); // Récupère les informations de l'utilisateur connecté

// route de vérification d'email
router.get("/verify-email", userController.verifyEmail);

module.exports = router;
