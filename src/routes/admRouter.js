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

router.get("/add", admController.agregado);

router.post('/add', upload.single('image') ,admController.guardarProducto);

router.get("/edit/:idProducto", admController.editado);

router.put('/edit', admController.editadoPut);

module.exports = router;