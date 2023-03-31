// Requerimos path para poder enviar los archivos HTML
const path = require('path');
// Creamos el objeto literal con los métodos a exportar
const productsController = {
    
    producto: (req,res)=>{
        let producto = [
            {id:1, categoria:'Coleccion raquetas 2023', nombre_producto: 'Metalbone 23', precio:'$40.000'},
            {id:2, categoria:'Coleccion raquetas 2023', nombre_producto: 'Royal 23', precio:'$40.000'},
            {id:3, categoria:'Coleccion raquetas 2023', nombre_producto: 'Babolat 23', precio:'$40.000'},
            {id:4, categoria:'Coleccion raquetas 2023', nombre_producto: 'Adidas 23', precio:'$40.000'},
            {id:5, categoria:'Coleccion raquetas 2023', nombre_producto: 'Nike 23', precio:'$40.000'}
        ];

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
        let producto = [
            {id:1, categoria:'Coleccion raquetas 2023', nombre_producto: 'Metalbone 23', precio:'$40.000'},
            {id:2, categoria:'Coleccion raquetas 2023', nombre_producto: 'Royal 23', precio:'$40.000'},
            {id:3, categoria:'Coleccion raquetas 2023', nombre_producto: 'Babolat 23', precio:'$40.000'},
            {id:4, categoria:'Coleccion raquetas 2023', nombre_producto: 'Adidas 23', precio:'$40.000'},
            {id:5, categoria:'Coleccion raquetas 2023', nombre_producto: 'Nike 23', precio:'$40.000'}
        ];

        res.render('products/filtrado', {producto:producto});
    },

    search: (req,res)=>{
        let producto = [
            {id:1, categoria:'Coleccion raquetas 2023', nombre_producto: 'Metalbone 23', precio:'$40.000'},
            {id:2, categoria:'Coleccion raquetas 2023', nombre_producto: 'Royal 23', precio:'$40.000'},
            {id:3, categoria:'Coleccion raquetas 2023', nombre_producto: 'Babolat 23', precio:'$40.000'},
            {id:4, categoria:'Coleccion raquetas 2023', nombre_producto: 'Adidas 23', precio:'$40.000'},
            {id:5, categoria:'Coleccion raquetas 2023', nombre_producto: 'Nike 23', precio:'$40.000'}
        ];

        let busqueda = req.query.busqueda;

        let resultado = [];

        for (let i = 0; i<producto.length; i++){
            if (producto[i].nombre_producto.includes(busqueda)){
                resultado.push(producto[i]);
            }
        }

        res.render('products/filtrado', {producto:resultado});
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;