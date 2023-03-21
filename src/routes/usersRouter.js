let express = require('express');
let router = express.Router();
const usersController =  require("../controllers/usersController.js");
router.get('/productCart',usersController.carrito);
router.get('/wishlist',usersController.wishlist);
module.exports = router;