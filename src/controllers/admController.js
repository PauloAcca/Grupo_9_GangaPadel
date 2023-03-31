// Requerimos path para poder enviar los archivos HTML
const { writeFileSync } = require('fs');
const path = require('path');
const fs=require('fs');
// Creamos el objeto literal con los métodos a exportar
const admController = {

     // Manejo del pedido get con ruta
    agregado: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        res.render('adm/agregado');
    },
    editado:  (req,res)=>{
        // comunicarse con el modelo, conseguir información
    let idProducto= req.params.idProducto;

    let producto = [
        {id:1, categoria:'Coleccion raquetas 2023', nombre_producto: 'Metalbone 23', precio:'$40.000'},
        {id:2, categoria:'Coleccion raquetas 2023', nombre_producto: 'Royal 23', precio:'$40.000'},
        {id:3, categoria:'Coleccion raquetas 2023', nombre_producto: 'Babolat 23', precio:'$40.000'},
        {id:4, categoria:'Coleccion raquetas 2023', nombre_producto: 'Adidas 23', precio:'$40.000'},
        {id:5, categoria:'Coleccion raquetas 2023', nombre_producto: 'Nike 23', precio:'$40.000'}
    ];

    let productoEditar = producto[idProducto-1];

    console.log(productoEditar);

    res.render('adm/editado', {productoEditar:productoEditar});
    },

    editadoPut: (req,res) => {
        let producto = [
            {id:1, categoria:'Coleccion raquetas 2023', nombre_producto: 'Metalbone 23', precio:'$40.000'},
            {id:2, categoria:'Coleccion raquetas 2023', nombre_producto: 'Royal 23', precio:'$40.000'},
            {id:3, categoria:'Coleccion raquetas 2023', nombre_producto: 'Babolat 23', precio:'$40.000'},
            {id:4, categoria:'Coleccion raquetas 2023', nombre_producto: 'Adidas 23', precio:'$40.000'},
            {id:5, categoria:'Coleccion raquetas 2023', nombre_producto: 'Nike 23', precio:'$40.000'}
        ];
        
        producto[req.body.id-1] = req.body;
        res.redirect('/');
    },

    guardarProducto: (req,res)=>{
        console.log(req.body);
        let prodcuto = {
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            condition: req.body.condition,
            description: req.body.description,
        }

        //guardo

        let productoJSON =JSON.stringify(prodcuto);

        fs.writeFileSync('productos.json', productoJSON);

        res.redirect('/');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = admController;