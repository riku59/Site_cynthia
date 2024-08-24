const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Récupérer l'ID de l'utilisateur authentifié

  try {
    console.log("Cart Model:", Cart);
    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    const price = product.price;
    const item = {
      product: productId,
      quantity,
      price,
      total: quantity * price,
    };

    if (cart) {
      let itemIndex = cart.items.findIndex(
        (p) => p.product.toString() === productId
      );

      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        productItem.total = productItem.quantity * productItem.price;
      } else {
        cart.items.push(item);
      }
    } else {
      cart = new Cart({
        user: userId,
        items: [item],
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error("Erreur d'ajout au panier:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout au panier" });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user._id; // Récupérer depuis req.user

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du panier" });
  }
};

exports.updateCartItem = async (req, res) => {
  const userId = req.user._id; // Récupérer depuis req.user
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    let itemIndex = cart.items.findIndex((p) => p._id.toString() === itemId);

    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      productItem.quantity = quantity;
      productItem.total = quantity * productItem.price;
    } else {
      return res
        .status(404)
        .json({ message: "Article non trouvé dans le panier" });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du panier" });
  }
};

exports.removeCartItem = async (req, res) => {
  const userId = req.user._id; // Récupérer depuis req.user
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'article" });
  }
};

exports.emptyCart = async (req, res) => {
  const userId = req.user._id; // Récupérer depuis req.user

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    cart.items = []; // Vider les articles
    await cart.save();
    res.status(200).json({ message: "Panier vidé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la vidange du panier:", error);
    res.status(500).json({ message: "Erreur lors de la vidange du panier" });
  }
};
