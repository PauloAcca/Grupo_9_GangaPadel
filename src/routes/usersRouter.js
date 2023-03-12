let express = require('express');
let router = express.Router();
const usersController =  require("../controllers/usersController.js");
router.get('/carrito',usersController.carrito);
router.get('/wishlist',usersController.wishlist);
module.exports = router;