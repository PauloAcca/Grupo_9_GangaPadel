const express = require('express');
const router = express.Router();
// Requerimos multer
const multer = require('multer');
const productsController =  require("../controllers/productsController.js");
let db = require("../../dataBase/models")
const Op = db.Sequelize.Op
//API
router.get("/api/products", (req, res) => {
    db.Producto.findAll()
        .then(products => res.json(products))
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});
//API
router.get("/api/category", (req, res) => {
    db.Marca.findAll()
        .then(categories => res.json(categories))
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});


// api parametrizada
router.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;

    db.Producto.findByPk(productId)
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});

router.get('/',productsController.filtrado);
router.get('/detail/:id',productsController.detalle);
router.get('/search',productsController.search);
module.exports = router;