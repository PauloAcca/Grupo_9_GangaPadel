const express = require('express');
const router = express.Router();
const  {body} = require('express-validator');
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

const validationsFiltro =[body('minimo').optional().custom((value, { req }) => {
    if (value !== undefined && value !== '' && isNaN(value)) {
        throw new Error('El precio mínimo debe ser un número');
    }
    return true;
    }).withMessage('El precio minimo debe ser un número'),
    body('maximo').optional().custom((value, { req }) => {
    if (value !== undefined && value !== '' && isNaN(value)) {
        throw new Error('El precio maximo debe ser un número');
    }
    return true;
    }).withMessage('El precio maximo debe ser un número'),
]

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

router.post('/filtro',validationsFiltro,productsController.filtro);
router.get('/specials',productsController.specials);
router.get('/search',productsController.search);
router.get('/',productsController.filtrado);
router.get('/detail/:id',productsController.detalle);
router.get('/:marca',productsController.marca);
router.get('/cat/:categoria',productsController.categoria);


module.exports = router;