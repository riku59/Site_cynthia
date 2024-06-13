const ProductModel = require("../models/product.model");
const multer = require("multer");
const path = require("path");

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.setProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!req.body.description || !req.body.price) {
      return res
        .status(400)
        .json({ message: "Merci d'ajouter une description et un prix" });
    }

    try {
      const product = await ProductModel.create({
        imageUrl: "/uploads/" + req.file.filename,
        description: req.body.description,
        price: req.body.price,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

module.exports.editProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Ce produit n'existe pas" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Ce produit n'existe pas" });
    }

    await product.remove();
    res.status(200).json({ message: "Produit supprimé " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
