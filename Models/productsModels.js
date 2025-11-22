const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: [
    {
      type: String,
      enum: ["S", "M", "L", "XL"],
    },
  ],
  colors: {
    type: [String],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema, "product");
module.exports = Product;
