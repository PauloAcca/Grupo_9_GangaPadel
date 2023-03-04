// Requerimos path para poder enviar los archivos HTML
const path = require("path");

// Creamos el objeto literal con los métodos a exportar
const mainController = {

     // Manejo del pedido get con ruta
    home: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        res.sendFile(path.resolve(__dirname,"../views/home.html"))
    },

    //Repito proceso para todas las vistas
    login: (req,res)=>{
        res.sendFile(path.join(__dirname,"../views/login.html"))
    },

    registro: (req,res)=>{
        res.sendFile(path.join(__dirname,"../views/registro.html"))
    },

    producto: (req,res)=>{
        res.sendFile(path.join(__dirname,"../views/producto.html"))
    },

    carrito: (req,res)=>{
        res.sendFile(path.join(__dirname,"../views/carrito.html"))
    },

    wishlist: (req,res)=>{
        res.sendFile(path.join(__dirname,"../views/wishlist.html"))
    },
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;