let express = require('express');
let router = express.Router();
const usersController =  require("../controllers/usersController.js");
const authMiddleware = require("../middlewares/authMiddleware")
router.get('/carrito',usersController.carrito);
router.post('/carrito/agregar',usersController.agregar)
module.exports = router;