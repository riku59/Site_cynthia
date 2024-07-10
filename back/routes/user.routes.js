const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

router.get("/me", userController.getUserInfo); // Récupère les informations de l'utilisateur connecté
router.get("/confirm/:confirmationCode", authController.verifyUser);
// route de vérification d'email

module.exports = router;
