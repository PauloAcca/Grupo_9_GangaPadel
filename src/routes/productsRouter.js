const express = require('express');
const router = express.Router();
const  {body} = require('express-validator');
const productsController =  require("../controllers/productsController.js");

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

router.post('/filtro',validationsFiltro,productsController.filtro);
router.get('/',productsController.filtrado);
router.get('/detail/:id',productsController.detalle);
router.get('/search',productsController.search);
router.get('/:marca',productsController.marca);
router.get('/cat/:categoria',productsController.categoria);
module.exports = router;