const {
  getUsers,
  getUserById,
  patchById,
  createUser,
  deleteUser,
  countUsers,
  getUsersByEmail,
  addUsers,
  getUsersByAge,
} = require("../controllers/usersControllers");

const router = require("express").Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Obtiene la colección de usuarios completa.
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *       500:
 *         description: Error al obtener los usuarios
 */
// GET /users → trae todos los usuarios
router.get("/", getUsers);

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Obtiene el número total de usuarios
 *     description: Devuelve la cantidad total de usuarios almacenados.
 *     responses:
 *       200:
 *         description: Conteo obtenido correctamente
 *       500:
 *         description: Error al obtener el conteo de usuarios
 */
// GET /users/count → devuelve la cantidad total de usuarios
router.get("/count", countUsers);

/**
 * @swagger
 * /users/search/email:
 *   get:
 *     summary: Obtiene usuarios mostrando solo el nombre
 *     description: Devuelve una lista de usuarios mostrando únicamente el nombre.
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *       500:
 *         description: Error al obtener los usuarios
 */
// GET /users/search/email → devuelve usuarios mostrando solo el nombre
router.get("/search/email", getUsersByEmail);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Obtiene un usuario concreto según su ID.
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

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualiza un usuario existente por su ID
 *     description: Actualiza los detalles de un usuario utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nuevo nombre"
 *               email:
 *                 type: string
 *                 example: "nuevo@email.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: No se encontró el usuario
 *       500:
 *         description: Error al actualizar el usuario
 */
// PATCH /users/:id → actualiza parcialmente un usuario
router.patch("/:id", patchById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario y envía email de registro
 *     description: Crea un usuario en la base de datos y envía un email de bienvenida.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Lidia"
 *               email:
 *                 type: string
 *                 example: "lidia@example.com"
 *     responses:
 *       201:
 *         description: Usuario creado y email enviado correctamente
 *       400:
 *         description: Petición inválida
 *       500:
 *         description: Error interno del servidor
 */
// POST /users → crea un nuevo usuario
router.post("/", createUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     description: Borra un usuario de la base de datos utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: El usuario no existe
 *       500:
 *         description: Error al eliminar el usuario
 */
// DELETE /users/:id → elimina un usuario por su ID
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /users/addusers:
 *   post:
 *     summary: Inserta varios usuarios aleatorios
 *     description: Crea 10 usuarios con nombre, email y edad generados automáticamente.
 *     responses:
 *       201:
 *         description: Usuarios creados correctamente
 *       500:
 *         description: Error al crear los usuarios
 */
router.post("/addusers", addUsers);

/**
 * @swagger
 * /users/age/{age}:
 *   get:
 *     summary: Obtiene usuarios por edad
 *     description: Devuelve todos los usuarios que coinciden con una edad dada.
 *     parameters:
 *       - in: path
 *         name: age
 *         required: true
 *         description: Edad a filtrar
 *         schema:
 *           type: integer
 *           example: 30
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *       400:
 *         description: Edad no válida
 *       404:
 *         description: No se encontraron usuarios con esa edad
 *       500:
 *         description: Error al obtener los usuarios
 */
// GET /users/age/:age → devuelve usuarios por edad
router.get("/age/:age", getUsersByAge);

module.exports = router;
