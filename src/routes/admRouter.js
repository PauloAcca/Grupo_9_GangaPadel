const express = require('express');
const router = express.Router();
const admController =  require("../controllers/admController.js");

router.get("adm/agregado", admController.agregado);

module.exports = router;