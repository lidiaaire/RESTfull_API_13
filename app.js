// Importamos el módulo de express
const express = require("express");

// Importamos Mongo
const mongoose = require("mongoose");

// Declaramos el puerto donde se levantará el servidor
const PORT = 3000;

// Importamos el router de usuarios
const userRouter = require("./router/userRoutes");

// Inicializamos express
const app = express();

// Analizamos los archivos JSON del body
app.use(express.json());

// Esto nos permite obtener la informacion de configuracion de ".env"
require("dotenv").config();

const url_mongo = process.env.DATABASE_URL_DEV;

console.log("url_mongo =>", url_mongo);

mongoose.connect(url_mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con Mongo ${error}`);
});

db.on("connected", () => {
  console.log(`Succecss connect`);
});

db.on("disconected", () => {
  console.log(`Mongo is disconected`);
});

// Ruta simple para comprobar que el servidor responde
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Montamos el router en /users
app.use("/users", userRouter);

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
