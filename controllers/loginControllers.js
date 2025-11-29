const loginModel = require("../Models/loginModel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const newUser = new loginModel({
      email,
      password: await bcrypt.hash(password, 10),
      role, // si no lo mandas, usará el default "user"
    });

    await newUser.save();

    return res.status(201).json({
      status: "Success",
      message: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    // Email duplicado
    if (error.code === 11000) {
      return res.status(409).json({
        status: "Failed",
        message: "El correo ya existe",
      });
    }

    return res.status(400).json({
      status: "Error",
      message: "No se pudo crear el usuario",
      error: error.message,
    });
  }
};

module.exports = { signup };
