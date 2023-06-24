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
    body('name').notEmpty().isLength({min: 5}).withMessage('Insertar un nombre superior a 5 caracteres'),
body('description').notEmpty().isLength({min: 20}).withMessage('Insertar una descripción superior a 20 caracteres'),
body('image').custom(async (value, { req }) => {
    const extension = value;
    if (value.endsWith('.jpg')||value.endsWith('.gif')||value.endsWith('.jpeg')||value.endsWith('.png')) {
    throw new Error('Formato de imagen incorrecto');
    }
}).withMessage('Formato de imagen incorrecto')];

const upload = multer({storage});

router.get("/add", admController.crear);

router.post('/add', upload.single('image') , admController.guardarProducto);

router.get("/edit/:idProducto", admController.editado);

router.put('/edit/:idProducto', upload.single('image') ,admController.actualizar);

router.delete('/delete/:idProducto',admController.delete);


module.exports = router;