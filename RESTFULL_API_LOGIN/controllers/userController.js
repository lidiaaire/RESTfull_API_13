const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  np;
  try {
    const { name, email, password, edad, role } = req.body;

    const user = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      edad: edad,
      role: role,
    });

    await user.save();

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        status: "Error",
        message: "El email ya existe",
      });
    }
    res.status(400).json({
      status: "Error",
      message: "No se pudo crear el usuario",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscamos por email si existe en la base de datos
    const user = await User.findOne({ email: email });
    // En el caso de que si, entramos en el if, si no, devolvemos el mensaje por else
    if (user) {
      // Comparamos las contraseñas y si nos devuelve un true, es que es correcto
      // De lo contrario, devuelve un false y manda el mensaje
      const validPassword = await bcrypt.compare(password, user.password);
      console.log(validPassword);

      if (validPassword) {
        // TODO: Generar un token
        const payload = {
          userId: user._id,
          nombre: user.name,
          email: user.email,
        };
        const token = generateToken(payload, false);
        const token_refresh = generateToken(payload, true);

        return res.status(200).json({
          status: "succeeded",
          data: user,
          token: token,
          token_refresh: token_refresh,
        });
      } else {
        return res.status(200).json({
          status: "Error",
          message: "Email y contraseña no coinciden",
        });
      }
    } else {
      return res.status(200).json({
        status: "Error",
        message: "Email y contraseña no coinciden",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se ha podido hacer login",
      error: error.message,
    });
  }
};

module.exports = { addUser, login };
