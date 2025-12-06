const Mobile = require("../models/mobileModel");

const createMobile = async (req, res) => {
  try {
    const { marca, modelo, precio, colores } = req.body;
    const mobile = new Mobile({ marca, modelo, precio, colores });
    mobile.save();
    res.status(200).json({
      status: "success",
      data: mobile,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "No se pudo crear el producto",
      error: error.message,
    });
  }
};

module.exports = { createMobile };
