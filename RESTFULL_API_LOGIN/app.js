// Importamos express y mongoose
const express = require("express");
const mongoose = require("mongoose");

// Cargamos variables de entorno
require("dotenv").config();

// Inicializamos express
const app = express();

// Middleware para leer JSON
app.use(express.json());

// Puerto del servidor
const PORT = 3000;

// Importamos el router de usuarios
const userRouter = require("./routers/userRouter");

// Conectamos con Mongo
const url_mongo = process.env.DATABASE_URL_DEV;

mongoose.connect(url_mongo);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Success connect");
});

db.on("error", (error) => {
  console.log("Error en conexión:", error);
});

// Rutas
app.use("/users", userRouter);

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
