const express = require("express");
const {
  getProducts,
  setProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product.controllers.js");

const router = express.Router();
const adminAuth = require("../middleware/adminAuth.js");

router.get("/", getProducts);
router.post("/", adminAuth, setProduct);
router.put("/:id", adminAuth, editProduct);
router.delete("/:id", adminAuth, deleteProduct);
module.exports = router;
