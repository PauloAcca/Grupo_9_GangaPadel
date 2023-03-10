// Requerimos path para poder enviar los archivos HTML
const path = require('path')
// Creamos el objeto literal con los métodos a exportar
const mainController = {

     // Manejo del pedido get con ruta
    home: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        res.render('home/home');
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