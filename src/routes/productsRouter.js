let express = require('express');
let router = express.Router();
const productsController =  require("../controllers/productsController.js");
router.get('/filtrado',productsController.filtrado);
router.get('/producto',productsController.producto);
module.exports = router;