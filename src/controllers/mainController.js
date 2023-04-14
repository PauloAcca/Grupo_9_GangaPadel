// Requerimos path para poder enviar los archivos HTML
const path = require('path')
const fs=require('fs');
const archivo= path.join(__dirname,'..','data','productos.json');
// Creamos el objeto literal con los métodos a exportar
const mainController = {

     // Manejo del pedido get con ruta
    index: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        let producto= JSON.parse(archivoProductos);

        res.render('home/index', {producto: producto});
    },

    //Repito proceso para todas las vistas
    login: (req,res)=>{
        res.render('home/login');
    },

    registro: (req,res)=>{
        res.render('home/registro');
    },
    newUser: (req,res) =>{
        res.redirect('/');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;