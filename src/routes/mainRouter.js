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
// Traigo a los usuarios de mi base de datos 
let db = require("../../dataBase/models")
//hacemos un array de lo que vamos a validar

const validationsRegister = [
    body('nombre').notEmpty().withMessage('El nombre no puede estar vacio').isLength({min:2}).withMessage('El nombre debe tener al menos 2 letras'),
    body('apellido').notEmpty().withMessage('El apellido no puede estar vacio').isLength({min:2}).withMessage('El apellido debe tener al menos 2 letras'),
    //bail corta las validaciones de email
    body('email').notEmpty().withMessage('El email no puede estar vacio').bail().isEmail().withMessage('Ingrese un mail valido').custom(async (value, { req }) => {
        const user = await db.Usuario.findOne({ where: { email: value } });
        if (user) {
        throw new Error('El correo electrónico ya está en uso');
        }
    }).withMessage('El correo electrónico ya está en uso'),
    body('password1').notEmpty().withMessage('La password no puede estar vacia').bail().isLength({ min: 8 }).withMessage('La password debe tener minimo 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+]{8,}$/)
    .withMessage('La password debe contener al menos una mayuscula, una minuscula y un numero'),
    body('password2').notEmpty().withMessage('La password no puede estar vacia').custom((value,{req})=>{
        if (value!==req.body.password1){
            throw new Error('La confirmación de la password no coincide con la password');
        }
        return true;
    })
];
const validationsLogin = [
    body('email').notEmpty().withMessage('El Mail no puede estar vacio').isEmail().withMessage('Inserte formato válido').custom(async (value, { req }) => {
        const user = await db.Usuario.findOne({ where: { email: value } });
        if (!user) {
        throw new Error('El correo electrónico no está registrado');
        }
    }).withMessage('El correo no está registrado'),
    body('password').notEmpty().withMessage('Password requerida').custom(async (value, { req }) => {
        const contra = await db.Usuario.findOne({ where: { pasword: value } });
        if (!contra || contra != user) {
        throw new Error('Contraseña o usuario incorrecto');
        }
    }).withMessage('Contraseña o usuario incorrecto'),
]


// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos

// Procesa el pedido get con ruta /
router.get("/", mainController.index);

// Repetimos proceso con las distintas vistas
router.get('/login',guestMiddleware ,mainController.login);
// Procesar el login
router.post('/login', guestMiddleware , validationsLogin, mainController.loginProcess);
// Ver el registro
router.get('/register',guestMiddleware, mainController.registro);
// ActualizarUsuario
router.get('/editarUsuario',guestMiddleware, mainController.editarUsuario);
// LogOut
router.get('/logOut', mainController.logOut);
// Procesar el registro
router.post('/register', fileUpload.single('imagenUsuario'),validationsRegister,mainController.processRegister); //fileUpload.single('nameDeInputEnEjs')
// si pongo processRegister en vez de newUser los usuarios de mandan a users.json y no a usuarios.json





// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports = router;