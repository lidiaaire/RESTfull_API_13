const user = require("../Models/userModels");
const userModel = require("../Models/userModels");

let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

// GET users - obtiene toda la colección
const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.send(users);
};

// GET BY ID  → obtiene un usuario
const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  res.send(user);
};

// PATCH actualizar parcialmente un usuario
const patchById = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    req.body,
    { new: true } // devuelve el actualizado
  );
  res.send(updatedUser);
};

// POST crea un usuario
const addUser = async (req, res) => {
  const { name, email } = req.body;
  const newUser = await userModel.create({ name, email });
  res.send(newUser);
};

// DELETE borra un usuario
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await userModel.findByIdAndDelete(userId);
  res.send(deletedUser);
};

module.exports = {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
};
