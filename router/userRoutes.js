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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Obtiene la colección de usuarios completa
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *       500:
 *         description: Error al obtener los usuarios
 */

// GET /users → trae todos los usuarios
router.get("/", getUsers);

// GET /users/count → devuelve la cantidad total de usuarios
router.get("/count", countUsers);

// GET /users/search/email → devuelve usuarios mostrando solo el nombre
router.get("/search/email", getUsersByEmail);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Obtiene un usuario concreto según su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID para obtener el usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       404:
 *         description: El usuario no existe
 *       500:
 *         description: Error al obtener el usuario
 */

// GET /users/:id → devuelve un usuario según su ID
router.get("/:id", getUserById);

// PATCH /users/:id → actualiza parcialmente un usuario
router.patch("/:id", patchById);

// POST /users → crea un nuevo usuario
router.post("/", addUser);

// DELETE /users/:id → elimina un usuario por su ID
router.delete("/:id", deleteUser);

module.exports = router;
