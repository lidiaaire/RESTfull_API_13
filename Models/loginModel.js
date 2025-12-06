const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"], // cualquier email bien formado
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
  },
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["admin", "user"],
    default: "user",
  },
});

const loginModel = mongoose.model("Login", loginSchema);

module.exports = loginModel;
