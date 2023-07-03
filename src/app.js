    // Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();

// Requerimos path
const path = require("path");

// Requerimos mainRouter
const mainRouter = require("./routes/mainRouter.js");

// Requerimos methodOverride
const methodOverride = require('method-override');

// Requerimos Session
const session = require('express-session');

// Guardamos direccion del puerto
const port = process.env.PORT || 3030;

// Importamos los distintos enrutadores
const admRouter = require('./routes/admRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware.js')
const cookies = require('cookie-parser');
const apiUsuarios = require("./controllers/apiUsuarios.js");

//requerimo sequelize y lo configuramos

const Sequelize = require('sequelize');
const dbConfig = require('../dataBase/config/config.js');
const sequelize = new Sequelize(dbConfig.development);

// elegimos nuestro view engine
app.set("view engine", "ejs");

// Usando recursos estáticos.
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Establecemos el metodo a usar en las vistas
app.set('views', path.resolve(__dirname, "views"));

// Indicamos Session como Midleware a nivel de aplicacion
app.use(session({
    secret: 'Esto es un secreto',
    resave: false,
    saveUninitialized: false
}));
// Otro Middleware de aplicacion
app.use(userLoggedMiddleware)

// Cookies
app.use(cookies());

// Usando los enrutadores importados
app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/admin", admRouter);


// Ponemos a escuchar el servidor
app.listen(port, () => {
    console.log("Servidor corriendo el puerto http://localhost:" + port);
});
