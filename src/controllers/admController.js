// Requerimos path para poder enviar los archivos HTML
const path = require('path');
// const { producto } = require('./productsController');
const fs=require('fs');
const archivo= path.join(__dirname,'..','data','productos.json');
//requiero todos los modelos de la base de datos
const db = require('../../dataBase/models');
const { producto } = require('./productsController');
// Creamos el objeto literal con los métodos a exportar
const admController = {

     // Manejo del pedido get con ruta
    crear: (req,res)=>{
        db.CategoriaProducto.findAll()
            .then(function(categoria){
                db.Marca.findAll()
                .then(function(marca){
                    return res.render('admin/crear', {categoria:categoria, marca:marca});
                })
                .catch(function(error){
                    return res.send('El error de la marca es: ' + error);
                })
                .catch(function(error){
                    return res.send('El error de la categoria es: ' + error);
            });
        });
    },

    editado:  (req,res)=>{
        // comunicarse con el modelo, conseguir información
        let oldProducto = db.Producto.findByPk(req.params.idProducto);
        let marca = db.Marca.findAll();
        let categoria = db.CategoriaProducto.findAll();

        Promise.all([oldProducto, marca, categoria])
            .then(function([producto,marca,categoria]){
                res.render('admin/editado', {producto:producto, marca:marca, categoria:categoria});
            }).catch(function(error){
                return res.send(error)});
    },

    actualizar: (req,res) => {
        db.Producto.update({
            nombreProducto: req.body.name,
            precio: parseInt(req.body.price),
            descuento: parseInt(req.body.discount),
            idCategoria: parseInt(req.body.category),
            descripcion: req.body.description,
            idMarca: parseInt(req.body.brand),
            image: req.file.filename,
        }, {where: { idProducto: req.params.idProducto} }
        ).then(()=>{
            res.redirect('/products/detail/' + req.params.idProducto);
        })
        .catch(error =>{
            res.send(error)
        })
    },

    guardarProducto: (req, res) => {
        db.Producto.create({
            nombreProducto: req.body.name,
            precio: parseInt(req.body.price),
            descuento: parseInt(req.body.discount),
            idCategoria: parseInt(req.body.category),
            descripcion: req.body.description,
            idMarca: parseInt(req.body.brand),
            image: req.file.filename,
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(error => {
            res.send(error);
        });
    },
    
    delete: (req,res)=>{
        db.Producto.destroy({
            where:{
                idProducto:req.params.idProducto,
            }
        })
        res.redirect('/');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = admController;