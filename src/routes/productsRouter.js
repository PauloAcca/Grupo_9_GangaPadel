const express = require('express');
const router = express.Router();
// Requerimos multer
const multer = require('multer');
const productsController =  require("../controllers/productsController.js");
router.get('/',productsController.filtrado);
router.get('/detail',productsController.producto);
router.get('/search',productsController.search);
module.exports = router;