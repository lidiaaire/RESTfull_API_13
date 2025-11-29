const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "El valor no puede ser menor que 0"],
  },
  description: {
    type: String,
    required: true,
  },
  size: [
    {
      type: [String],
      enum: ["S", "M", "L", "XL"],
      default: ["S", "M", "L", "XL"],
    },
  ],
  colors: {
    type: [String],
    required: true,
    validate: [arrayMinLength, "Debe de tener un color minimo"],
  },
  brand: {
    type: String,
    required: true,
  },
});

function arrayMinLength(arr) {
  return arr.length > 0;
}

const Product = mongoose.model("Product", productSchema, "product");
module.exports = Product;
