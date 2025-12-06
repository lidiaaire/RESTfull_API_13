const Product = require("../Models/productsModels");
const { sendEmail } = require("../services/emailServices");

// POST /products → crear producto
const createProduct = async (req, res) => {
  try {
    const { name, price, description, size, colors, brand } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      size,
      colors,
      brand,
    });

    const savedProduct = await newProduct.save();
    ma;

    res.status(201).json({
      status: "Success",
      message: "Producto creado correctamente",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "No se pudo crear el producto",
      error: error.message,
    });
  }
};

// GET /products → obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    await sendEmail();
    res.status(200).json({
      status: "Success",
      message: "Productos obtenidos correctamente",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "No se pudieron obtener los productos",
      error: error.message,
    });
  }
};

// GET /products/:id → obtener producto por id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Producto obtenido correctamente",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "No se pudo obtener el producto",
      error: error.message,
    });
  }
};

// PATCH /products/:id → actualizar producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado para actualizar",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Producto actualizado correctamente",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "No se pudo actualizar el producto",
      error: error.message,
    });
  }
};

// DELETE /products/:id → eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado para eliminar",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Producto eliminado correctamente",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "No se pudo eliminar el producto",
      error: error.message,
    });
  }
};

// GET /products/average-price → media de precios
const getAveragePrice = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products.length) {
      return res.status(404).json({
        status: "Error",
        message: "No hay productos para calcular el promedio de precios",
      });
    }

    const total = products.reduce((acc, product) => acc + product.price, 0);
    const averagePrice = total / products.length;

    res.status(200).json({
      status: "Success",
      message: "Media de precios calculada exitosamente",
      averagePrice: averagePrice,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "No se pudo calcular la media de precios",
      error: error.message,
    });
  }
};

// GET /products/:id/sizes → solo tallas del producto
const getSizesByProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId, "size");

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }

    const sizes = product.size;

    res.status(200).json({
      status: "Success",
      message: "Tallas del producto obtenidas exitosamente",
      sizes: sizes,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudieron obtener las tallas del producto",
      error: error.message,
    });
  }
};
// DELETE /products/:id/color/:color → elimina un color concreto
const deleteColorByProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const colorToDelete = req.params.color;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }

    const indexOfColor = product.colors.indexOf(colorToDelete);

    if (indexOfColor === -1) {
      return res.status(404).json({
        status: "Error",
        message: "Color no encontrado en el producto",
      });
    }

    product.colors.splice(indexOfColor, 1);
    await product.save();

    res.status(200).json({
      status: "Success",
      message: "Color eliminado del producto exitosamente",
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudo eliminar el color del producto",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAveragePrice,
  getSizesByProductId,
  deleteColorByProductId,
};
