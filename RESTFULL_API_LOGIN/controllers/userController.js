const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { name, email, password, edad, role } = req.body;
    const passwordCrypt = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passwordCrypt,
      edad,
      role,
    });

    await user.save();

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "No se pudo crear el usuario",
      error: error.message,
    });
  }
};

module.exports = { addUser };
