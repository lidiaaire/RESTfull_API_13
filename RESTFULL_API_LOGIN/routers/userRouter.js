const router = require("express").Router();
const { addUser } = require("../controllers/userController");

router.post("/singup", addUser);

module.exports = router;
