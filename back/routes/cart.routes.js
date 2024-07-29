const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  emptyCart,
} = require("../controllers/cart.controller");
const router = express.Router();

router.post("/cart", addToCart); // ajouter un produit au  panier
router.get("/cart", getCart); // Obtenir les détails du panier
router.put("/cart/:itemId", updateCartItem); // Mettre à jour la quantité d'un produit
router.delete("/cart/:itemId", removeCartItem); // Supprimer un produit du panier
router.delete("/cart", emptyCart); // Vider le panier

module.exports = router;
