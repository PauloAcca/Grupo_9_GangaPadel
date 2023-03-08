// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();

// Requerimos path

const path=require("path");

// Guardamos direccion del puerto
const port = process.env.PORT || 3030;

// Importamos los distintos enrutadores
const mainRouter=require("./routes/mainRouter.js");

// elegimos nuestro view engine
app.set("view engine", "ejs")

// Usando recursos estáticos.
app.use(express.static(path.resolve(__dirname,"../public")));

app.set('views', path.resolve(__dirname, "views"));

// Usando los enrutadores importados
app.use("/", mainRouter);
app.use("/login", mainRouter);
app.use("/registro", mainRouter);
app.use("/producto", mainRouter);
app.use("/filtrado", mainRouter);
app.use("/wishlist", mainRouter);
app.use("/carrito", mainRouter);
app.use("/header",mainRouter);
app.use("/footer",mainRouter);



// Ponemos a escuchar el servidor
app.listen(port, () => {
    console.log("Servidor corriendo el puerto: " + port);
});
