// Requerimos path para poder enviar los archivos HTML
const path = require('path')
// Creamos el objeto literal con los métodos a exportar
const mainController = {

     // Manejo del pedido get con ruta
    home: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        res.render('home')
    },

    //Repito proceso para todas las vistas
    login: (req,res)=>{
        res.render('login')
    },

    registro: (req,res)=>{
        res.render('registro')
    },

    producto: (req,res)=>{
        res.render('producto')
    },

    carrito: (req,res)=>{
        res.render('carrito')
    },

    wishlist: (req,res)=>{
        res.render('wishlist')
    },
    filtrado: (req,res)=>{
        res.render('filtrado')
    },
    header:  (req,res)=>{
        res.render('header');
    },
    footer:(req,res)=>{
        res.render('footer');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;