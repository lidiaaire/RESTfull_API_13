const user = require("../Models/userModels");
const userModel = require("../Models/userModels");

let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

// GET users → obtiene toda la colección
const getUsers = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

// GET BY ID  → obtiene un usuario
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

// PATCH →  obtiene un unico usuario
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

// POST crea un usuario
const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = new userModel({
      name,
      email,
    });

    await newUser.save();
    res.status(201).json({ status: "succeeded", newUser, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

// DELETE borra un usuario
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("El usuario no existe");
    }

    await userModel.findByIdAndDelete(userId);
    res.status(200).send({ status: "succeeded", error: null });
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
};
