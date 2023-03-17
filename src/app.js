// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();

// Requerimos path

const path=require("path");

// Guardamos direccion del puerto
const port = process.env.PORT || 3030;

// Importamos los distintos enrutadores
const mainRouter=require("./routes/mainRouter.js");
let admRouter = require('./routes/admRouter.js');
let usersRouter = require('./routes/usersRouter.js');
let productsRouter = require('./routes/productsRouter.js');

// elegimos nuestro view engine
app.set("view engine", "ejs");

// Usando recursos estáticos.
app.use(express.static("public"));

app.set('views', path.resolve(__dirname, "views"));

// Usando los enrutadores importados
app.use("/", mainRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);
app.use("/adm",admRouter);

// Ponemos a escuchar el servidor
app.listen(port, () => {
    console.log("Servidor corriendo el puerto: " + port);
});
