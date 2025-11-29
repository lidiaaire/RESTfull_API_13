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
    match: [/^\S+@\S+\.\S+$/, "Correo Incorrecto"],
  },
  age: {
    type: Number,
    default: 0,
  },
});

userSchema.index({ age: 1 });

// REGEX -- Es una expresion regular que se usa para validar los emalis

// ^: Indica el inicio de la cadena.
// \S+: Coincide con uno o más caracteres que no sean un espacio en blanco. En este caso, antes del "@".
// @: Busca el carácter "@".
// \S+: Similar al primero, busca uno o más caracteres que no sean un espacio en blanco después del "@".
// \.: Busca un punto literal (.). Se usa \ antes del punto porque el punto en una expresión regular significa “cualquier carácter”.
// \S+: Caracteres después del punto, como: .com,.es.net ....
// $: Indica el final de la cadena.

// Crear el modelo del usuario
// Un modelo es el que nos permite interactuar con la colección "User" en MongoDB
const userModel = mongoose.model("User", userSchema, "User");

// Exportar el modelo
module.exports = userModel;
