const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  emptyCart,
} = require("../controllers/cart.controller");
const authMiddleware = require("../middleware/authMiddleware"); // Assurez-vous que le chemin est correct

const router = express.Router();

router.post("/cart", authMiddleware, addToCart); // Ajouter le middleware d'authentification
router.get("/cart", authMiddleware, getCart);
router.put("/cart/:itemId", authMiddleware, updateCartItem);
router.delete("/cart/:itemId", authMiddleware, removeCartItem);
router.delete("/cart", authMiddleware, emptyCart);

module.exports = router;
