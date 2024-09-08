const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ProductModel = require("../models/product.model");

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).single("image");

// Fonction pour supprimer une image
const deleteImage = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("Erreur lors de la suppression du fichier:", err);
    else console.log("Fichier supprimé:", filePath);
  });
};

module.exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getProductByCategory = async (req, res) => {
  try {
    const products = await ProductModel.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.setProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: err.message });

    if (!req.body.description || !req.body.price || !req.body.category) {
      return res.status(400).json({
        message: "Merci d'ajouter une description, un prix et une catégorie ",
      });
    }

    try {
      const product = await ProductModel.create({
        imageUrl: "/uploads/" + req.file.filename,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

module.exports.editProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: err.message });

    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product)
        return res.status(400).json({ message: "Ce produit n'existe pas" });

      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      if (req.file) {
        product.imageUrl = "/uploads/" + req.file.filename;
      }

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product)
      return res.status(400).json({ message: "Ce produit n'existe pas" });

    const filePath = path.join(__dirname, "..", product.imageUrl);
    deleteImage(filePath);

    await product.remove();
    res.status(200).json({ message: "Produit supprimé " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
