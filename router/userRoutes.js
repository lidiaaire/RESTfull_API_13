const {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
  countUsers,
  getUsersByEmail,
} = require("../controllers/usersControllers");

const router = require("express").Router();

// GET /users → trae todos los usuarios
router.get("/", getUsers);

// GET /users/count → devuelve la cantidad total de usuarios
router.get("/count", countUsers);

// GET /users/search/email → devuelve usuarios mostrando solo el nombre
router.get("/search/email", getUsersByEmail);

// GET /users/:id → devuelve un usuario según su ID
router.get("/:id", getUserById);

// PATCH /users/:id → actualiza parcialmente un usuario
router.patch("/:id", patchById);

// POST /users → crea un nuevo usuario
router.post("/", addUser);

// DELETE /users/:id → elimina un usuario por su ID
router.delete("/:id", deleteUser);

module.exports = router;
