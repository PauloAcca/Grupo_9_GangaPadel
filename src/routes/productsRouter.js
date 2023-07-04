const express = require('express');
const router = express.Router();
const  {body} = require('express-validator');
// Requerimos multer
const multer = require('multer');
const productsController =  require("../controllers/productsController.js");
router.get('/filtro',productsController.filtro)
router.get('/',productsController.filtrado);
router.get('/detail/:id',productsController.detalle);
router.get('/search',productsController.search);
router.get('/:marca',productsController.marca);
router.get('/cat/:categoria',productsController.categoria);
module.exports = router;