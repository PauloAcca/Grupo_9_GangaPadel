const express = require('express');
const router = express.Router();
const path = require('path');
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

const upload = multer({storage});

router.get("/add", admController.crear);

router.post('/add', upload.single('image') ,admController.guardarProducto);

router.get("/edit/:idProducto", admController.editado);

router.put('/edit/:idProducto', upload.single('image') ,admController.actualizar);

router.delete('/delete/:idProducto',admController.delete);


module.exports = router;