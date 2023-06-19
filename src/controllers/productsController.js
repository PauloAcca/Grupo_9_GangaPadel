// Requerimos path para poder enviar los archivos HTML
const path = require('path');
const fs=require('fs');
const archivo= path.join(__dirname,'..','data','productos.json');
const db = require('../../dataBase/models');
// Creamos el objeto literal con los métodos a exportar
const productsController = {
    
    detalle: (req,res)=>{
        db.Producto.findByPk(req.params.id, {include: [{association: 'marcas'}, {association: 'categoriaProductos'}]})
            .then(function(producto){
                res.render('products/producto', {producto:producto})
            })
    },

    filtrado: (req,res)=>{
        db.Producto.findAll()
            .then(function(producto){
            res.render('products/filtrado', {producto:producto});
        })        
    },

    search: (req,res)=>{
        let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        let producto= JSON.parse(archivoProductos);

        let busqueda = req.query.busqueda;

        let resultado = [];

        for (let i = 0; i<producto.length; i++){
            if (producto[i].name.includes(busqueda)){
                resultado.push(producto[i]);
            }
        }

        res.render('products/filtrado', {producto:resultado});
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;