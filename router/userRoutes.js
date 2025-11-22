const {
  getUsers,
  getUserById,
  patchById,
  addUser,
  deleteUser,
} = require("../controllers/usersControllers");

const router = require("express").Router();

// GET /users
router.get("/", getUsers);

// GET /users/:id
router.get("/:id", getUserById);

// PATCH /users/:id
router.patch("/:id", patchById);

// POST /users
router.post("/", addUser);

// DELETE /users/:id
router.delete("/:id", deleteUser);

module.exports = router;
