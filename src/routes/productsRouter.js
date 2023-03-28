const express = require('express');
const router = express.Router();
const productsController =  require("../controllers/productsController.js");
router.get('/',productsController.filtrado);
router.get('/detail',productsController.producto);
module.exports = router;