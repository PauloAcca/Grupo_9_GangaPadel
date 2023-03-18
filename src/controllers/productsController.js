// Requerimos path para poder enviar los archivos HTML
const path = require('path');
// Creamos el objeto literal con los métodos a exportar
const productsController = {
    
    producto: (req,res)=>{
        res.render('products/producto');
    },

    filtrado: (req,res)=>{
        res.render('products/filtrado');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;