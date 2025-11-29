const userModel = require("../Models/userModels");
const { sendRegistrationEmail } = require("../services/emailServices");

let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

// GET users → obtiene toda la colección de usuarios desde MongoDB

const getUsers = async (req, res) => {
  try {
    console.log("➡️ GET /users llamado");

    const data = await userModel.find();

    return res.status(200).json({
      status: "succeeded",
      data,
      error: null,
    });
  } catch (error) {
    console.error("❌ Error en getUsers:", error);

    return res.status(500).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

// GET BY ID  → obtiene un usuario concreto según su ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    res.status(200).json({ status: "succeeded", user, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

// PATCH →  actualiza parcialmente un usuario (solo los campos enviados)
const patchById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      // Si el usuario no existe...
      return res.status(404).send("El usuario no existe");
    }

    if (name) {
      // Actualiza el nombre del usuario por un nuevo nombre
      user.name = name;
    }

    if (email) {
      // Actualiza el email por un nuevo email
      user.email = email;
    }

    await user.save(); // Guarda los cambios
    res.status(200).json({ status: "succeeded", user, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

// POST → crea un nuevo usuario
const addUser = async (req, res) => {
  try {
    const { name, email } = req.body; // Recoge datos del body

    const newUser = await userModel.create({ name, email });

    // Enviar email de registro
    await sendRegistrationEmail(email, name);

    res.status(201).json({
      status: "succeeded",
      message: "Usuario creado y email enviado",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No se pudo crear el usuario",
      error,
    });
  }
};

// DELETE → elimina un usuario según su ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      // Si el usuario no existe...
      return res.status(404).send("El usuario no existe");
    }

    await userModel.findByIdAndDelete(userId); // Elimina el usuario de la base de datos
    res.status(200).send({ status: "succeeded", error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

// GET count → obtiene el número total de usuarios
const countUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    const count = users.length;
    res.status(200).send({ status: "succeeded", count, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

// GET usuario por email (solo muestra name como ejemplo)
const getUsersByEmail = async (req, res) => {
  try {
    const users = await userModel.find({}, { name: 1, _id: 0 });
    res.status(200).send({ status: "succeeded", users, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  getUsersByEmail,
};
