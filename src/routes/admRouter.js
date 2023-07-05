const express = require('express');
const router = express.Router();
const path = require('path');
const  {body} = require('express-validator');
// Requerimos multer
const multer = require('multer');
const admController =  require("../controllers/admController.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/paletas'));
    },
    filename: (req,file,cb)=>{
        
        let newFilename = 'product-' + Date.now() + '-' + file.originalname;
        cb(null, newFilename);
    }
});
const validationsAdd = [
    body('name').notEmpty().withMessage('El nombre no debe estar vacio').isLength({min: 5}).withMessage('Insertar un nombre superior a 5 caracteres'),
    body('description').notEmpty().withMessage('La descripcion no debe estar vacia').isLength({min: 20}).withMessage('Insertar una descripción superior a 20 caracteres'),
    body('price')
    .notEmpty().withMessage('El precio no debe estar vacío')
    .isNumeric().withMessage('El precio debe ser un número')
    .custom(value => {
        if (parseFloat(value) < 0) {
            throw new Error('El precio no puede ser menor a 0');
        }
        return true;
    }).withMessage('El precio no puede ser menor a 0'),
    body('image')
    .custom((value, { req }) => {
        console.log(req.file)
        if (req.file === undefined)  {
            throw new Error('Debes seleccionar una imagen');
        }else{
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            const fileExtension = path.extname(req.file.originalname).toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error('Formato de imagen incorrecto');
            }
            return true;
        }
    }).withMessage('Formato de imagen incorrecto')]
    

const upload = multer({storage});

router.get("/add", admController.crear);

router.post('/add', upload.single('image'), validationsAdd, admController.guardarProducto);

router.get("/edit/:idProducto", admController.editado);

router.put('/edit/:idProducto', upload.single('image'), validationsAdd , admController.actualizar);

router.delete('/delete/:idProducto',admController.delete);


module.exports = router;