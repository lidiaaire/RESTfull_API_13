const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAveragePrice,
} = require("../controllers/productsControllers");

// GET /products → todos los productos
router.get("/", getAllProducts);

// GET /products/average-price → media de precios
router.get("/average-price", getAveragePrice);

// GET /products/:id → producto por id
router.get("/:id", getProductById);

// POST /products → crear producto
router.post("/", createProduct);

// PATCH /products/:id → actualizar producto
router.patch("/:id", updateProduct);

// DELETE /products/:id → eliminar producto
router.delete("/:id", deleteProduct);

module.exports = router;
