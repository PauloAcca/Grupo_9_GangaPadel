// Requerimos path para poder enviar los archivos HTML
const path = require('path')
// Creamos el objeto literal con los métodos a exportar
const mainController = {

     // Manejo del pedido get con ruta
    index: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        let productos={categoria:'Coleccion raquetas 2023', nombre_producto: 'Metalbone 23', precio:'$40.000'}
        res.render('home/index', {productos});
    },

    //Repito proceso para todas las vistas
    login: (req,res)=>{
        res.render('home/login');
    },

    registro: (req,res)=>{
        res.render('home/registro');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;