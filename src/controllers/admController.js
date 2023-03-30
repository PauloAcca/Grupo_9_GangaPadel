// Requerimos path para poder enviar los archivos HTML
const path = require('path');
// Creamos el objeto literal con los métodos a exportar
const admController = {

     // Manejo del pedido get con ruta
    agregado: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        res.render('adm/agregado');
    },
    editado:  (req,res)=>{
        // comunicarse con el modelo, conseguir información
    res.render('adm/editado');
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
        res.redirect('/');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = admController;