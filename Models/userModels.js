// Importar Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir el Schema del usuario
// Un Schema es la plantilla que define cómo será cada documento de la colección Users
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Crear el modelo del usuario
// Un modelo es el que nos permite interactuar con la colección "User" en MongoDB
const userModel = mongoose.model("User", userSchema, "User");

// Exportar el modelo
module.exports = userModel;
