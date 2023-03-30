// Requerimos path para poder enviar los archivos HTML
const path = require('path')
// Creamos el objeto literal con los métodos a exportar
const mainController = {

     // Manejo del pedido get con ruta
    index: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        let producto = [
            {id:1, categoria:'Coleccion raquetas 2023', nombre_producto: 'Metalbone 23', precio:'$40.000'},
            {id:2, categoria:'Coleccion raquetas 2023', nombre_producto: 'Royal 23', precio:'$40.000'},
            {id:3, categoria:'Coleccion raquetas 2023', nombre_producto: 'Babolat 23', precio:'$40.000'},
            {id:4, categoria:'Coleccion raquetas 2023', nombre_producto: 'Adidas 23', precio:'$40.000'},
            {id:5, categoria:'Coleccion raquetas 2023', nombre_producto: 'Nike 23', precio:'$40.000'}
        ];
        res.render('home/index', {producto: producto});
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