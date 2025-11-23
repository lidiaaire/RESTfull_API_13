const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAveragePrice,
  getSizesByProductId,
  deleteColorByProductId,
} = require("../controllers/productsControllers");

// GET /products → todos los productos
router.get("/", getAllProducts);

// GET /products/average-price → media de precios
router.get("/average-price", getAveragePrice);

// GET /products/:id/sizes → obtener las tallas del producto
router.get("/:id/sizes", getSizesByProductId);

// GET /products/:id → producto por id
router.get("/:id", getProductById);

// POST /products → crear producto
router.post("/", createProduct);

// PATCH /products/:id → actualizar producto
router.patch("/:id", updateProduct);

// DELETE /products/:id/color/:color → Elimina un color en concreto
router.delete("/:id/color/:color", deleteColorByProductId);

// DELETE /products/:id → eliminar producto completo
router.delete("/:id", deleteProduct);

module.exports = router;
