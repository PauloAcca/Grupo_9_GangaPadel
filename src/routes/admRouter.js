const express = require('express');
const router = express.Router();
const admController =  require("../controllers/admController.js");

router.get("/add", admController.agregado);

router.post('/add', admController.guardarProducto);

router.get("/edit/:idProducto", admController.editado);

router.put('/edit', admController.editadoPut);

module.exports = router;