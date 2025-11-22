const user = require("../Models/userModels");
const userModel = require("../Models/userModels");

let USERS = [
  { id: 1, name: "Usuario 1", email: "usuario1@example.com" },
  { id: 2, name: "Usuario 2", email: "usuario2@example.com" },
  { id: 3, name: "Usuario 3", email: "usuario3@example.com" },
];

// GET users - obtiene toda la colección
const getUsers = async (req, res) => {
  const data = await userModel.find();
  res.status(200).json({ status: "succeeded", data, error: null });
};

// GET BY ID  → obtiene un usuario
const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  res.send(user);
};

// PATCH actualizar parcialmente un usuario
const patchById = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = USERS.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).send("El usuario no existe");
  }

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  res.send(user);
};

// POST crea un usuario
const addUser = (req, res) => {
  const { name, email } = req.body;
  const newIndex = USERS.length + 1;

  const newUser = {
    id: newIndex,
    name,
    email,
  };

  USERS.push(newUser);

  res.send(newUser);
};

// DELETE borra un usuario

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);

  const filteredUsers = USERS.filter((user) => user.id !== userId);

  if (filteredUsers.length === USERS.length) {
    return res.send("El usuario no existe");
  }

  USERS = filteredUsers;
  res.send(USERS);
};

module.exports = {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
};
