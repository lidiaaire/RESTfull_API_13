const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/loginControllers");

router.post("/singup", signup);

module.exports = router;
