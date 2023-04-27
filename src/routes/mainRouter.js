// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express=require("express");


const path=require("path");
// Creamos constante router desde el metodo .Router
const router = express.Router();
// Configuración de multer
const multer = require('multer');

// Requerimos los middlewares de usuario e invitado 
const guestMiddleware = require("../middlewares/guestMiddleware")

//requerimos express validator
const  {body} = require('express-validator');


// Importamos el controlador de las rutas por defecto
const mainController = require("../controllers/mainController.js");
const usersConbtroller = require("../controllers/usersController");

// Implemento multer 
let multerDiskStorage = multer.diskStorage({
    destination: (req,file,callback) =>{
        
        let folder = path.join(__dirname,'../../public/img/fotosPerfil');
        callback(null, folder);
    },
    filename: (req,file,callback) => {
        console.log(file);
        let imageName = 'user-'+ file.originalname + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});
let fileUpload = multer({storage: multerDiskStorage}); 

//hacemos un array de lo que vamos a validar

const validations = [
    body('nombre').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('apellido').notEmpty().withMessage('El apellido no puede estar vacio'),
    body('email').notEmpty().withMessage('El email no puede estar vacio'),
    body('password1').notEmpty().withMessage('La password no puede estar vacia'),
    body('password2').notEmpty().withMessage('La password no puede estar vacia'),
]

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Procesa el pedido get con ruta /
router.get("/", mainController.index);

// Repetimos proceso con las distintas vistas
router.get('/login',guestMiddleware ,mainController.login);
// Procesar el login
router.post('/login',guestMiddleware ,mainController.loginProcess);
// Ver el registro
router.get('/register',guestMiddleware, mainController.registro);
// LogOut
router.get('/logOut', mainController.logOut);
// Procesar el registro
router.post('/register', fileUpload.single('imagenUsuario'),mainController.processRegister); //fileUpload.single('nameDeInputEnEjs')
// si pongo processRegister en ves de newUser los usuarios de mandan a users.json y no a usuarios.json





// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;