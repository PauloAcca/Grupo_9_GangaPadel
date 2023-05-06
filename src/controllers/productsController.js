// Requerimos path para poder enviar los archivos HTML
const path = require('path');
const fs=require('fs');
const archivo= path.join(__dirname,'..','data','productos.json');
const db = require('../../dataBase/models');
// Creamos el objeto literal con los métodos a exportar
const productsController = {
    
    producto: (req,res)=>{
        let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        let producto= JSON.parse(archivoProductos);

        let idDetail=req.query.id;

        if (idDetail){
            productoDetail= producto.filter( producto=>{
                console.log([producto.id,parseInt(idDetail, 10)])
                return producto.id == parseInt(idDetail, 10)
            });
            console.log(productoDetail)
    
            res.render('products/producto', {productoDetail});
        }else{
            res.render('products/producto', {productoDetail:producto}); 
        }

    },

    filtrado: (req,res)=>{
        let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        let producto= JSON.parse(archivoProductos);

        res.render('products/filtrado', {producto:producto});
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