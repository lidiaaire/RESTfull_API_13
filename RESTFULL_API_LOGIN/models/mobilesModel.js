const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  marca: {
    type: String,
    require: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    require: true,
  },
  color: {
    type: [string],
    enum: ["Rojo", "Verde", "Azul", "Blanco", "Negro"],
    default: ["Rojo", "Verde", "Azul", "Blanco", "Negro"],
  },
});

const Mobile = mongoose.model("Mobile", mobileSchema);

module.exports = Mobile;
