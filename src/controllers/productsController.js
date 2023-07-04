// Requerimos path para poder enviar los archivos HTML
const db = require('../../dataBase/models');
const { validationResult } = require('express-validator');
// Creamos el objeto literal con los métodos a exportar
const productsController = {
    
    detalle: (req,res)=>{
        const response={};
        db.Producto.findByPk(req.params.id, {include: [{association: 'marcas'}, {association: 'categoriaProductos'}]})
        .then(function(producto){
            response.producto = producto;
            return db.Marca.findAll();
        })
        .then(function (marca) {
            response.marca = marca;
            return db.CategoriaProducto.findAll();
        })
        .then(function (categoria) {
            response.categoria = categoria;
            res.render('products/producto', { producto: response.producto, marca: response.marca, categoria: response.categoria });
        })
        .catch(function (error) {
            return res.send(error)
        });
    },

    filtrado: (req,res)=>{
        const response={};
        db.Producto.findAll({ include: [{ association: 'marcas' }, { association: 'categoriaProductos' }] })
        .then(function (producto) {
            response.producto = producto;
            return db.Marca.findAll();
            
        })
        .then(function (marca) {
            response.marca = marca;
            return db.CategoriaProducto.findAll();
        })
        .then(function (categoria) {
            response.categoria = categoria;
            res.render('products/filtrado', { producto: response.producto, marca: response.marca, categoria: response.categoria });
            
        })
        .catch(function (error) {
            return res.send(error)
        });
    },

    filtro:(req,res)=>{
        let response = {};
        let minimo = req.body.minimo;
        let maximo = req.body.maximo;
        let marca = req.body.marca;
        let categoria = req.body.categoria;
        let condiciones = {};
        let resultValidation = validationResult(req);

        if (minimo && maximo) {
            if(minimo>maximo){
                condiciones.precio = {
                    [db.Sequelize.Op.gte]: minimo
                };
            }else{
                condiciones.precio = {
                    [db.Sequelize.Op.between]: [minimo, maximo]
                };
            }
            
        }else if (minimo) {
            condiciones.precio = {
                [db.Sequelize.Op.gte]: minimo
            };
        } else if (maximo) {
            condiciones.precio = {
                [db.Sequelize.Op.lte]: maximo
            };
        }
        if (marca) {
            condiciones.idMarca = marca;
        }
        if (categoria) {
            condiciones.idCategoria = categoria;
        }

        db.Producto.findAll({
            where: condiciones,
            include:[{ association: 'marcas' }, { association: 'categoriaProductos' }]
        })
        .then(function(resultados){
            response.resultados = resultados;
            return db.Marca.findAll();
        })
        .then(function (marca) {
            response.marca = marca;
            return db.CategoriaProducto.findAll();
        })
            .then(function (categoria) {
            response.categoria = categoria;
            console.log(resultValidation)
            if (resultValidation.errors.length > 0){
                res.render('products/filtrado',{
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    producto: response.resultados,
                    marca: response.marca,
                    categoria: response.categoria
                })
            }else{
            res.render('products/filtrado', {producto: response.resultados, marca: response.marca, categoria: response.categoria})
            }
        }).catch(function(error){
            res.send(error);
        })
    },

    specials: (req,res)=>{
        let response={};
        db.Producto.findAll({
            where: {
                descuento: {
                    [db.Sequelize.Op.gte]: 1
                }
            },     
            include:[{ association: 'marcas' }, { association: 'categoriaProductos' }]
        })
        .then(function (producto) {
            response.producto = producto;
            return db.Marca.findAll();
        })
        .then(function (marca) {
            response.marca = marca;
            return db.CategoriaProducto.findAll();
        })
        .then(function (categoria) {
            response.categoria = categoria;
            res.render('products/filtrado', {producto: response.producto, marca: response.marca, categoria: response.categoria});
        })
        .catch(function (error) {
                res.send(error);
        });    
    },

    categoria: (req,res)=>{
        let busqueda = req.params.categoria;
        let response={};
        db.CategoriaProducto.findOne({
            where:{
                categoria: busqueda
            }
        }).then(function (categoria){
            
            return db.Producto.findAll({
                where: {
                    idCategoria: categoria.idCategoria
                },     
                include:[{ association: 'marcas' }, { association: 'categoriaProductos' }]
            }).then(function (producto) {
                response.producto = producto;
                return db.Marca.findAll();
            })
            .then(function (marca) {
                response.marca = marca;
                return db.CategoriaProducto.findAll();
            })
            .then(function (categoria) {
                response.categoria = categoria;
                res.render('products/filtrado', {producto: response.producto, marca: response.marca, categoria: response.categoria});
            })
            .catch(function (error) {
                    res.send(error);
            });      
        }).catch(function (error) {
            res.send(error);
        });      
    },

    marca: (req,res) =>{
        let busqueda = req.params.marca;
        let response={};
        db.Marca.findOne({
            where:{
                nombreMarca: busqueda
            }
        }).then(function (marca){
            return db.Producto.findAll({
                where: {
                    idMarca: marca.idMarca
                },     
                include:[{ association: 'marcas' }, { association: 'categoriaProductos' }]
            }).then(function (producto) {
                response.producto = producto;
                return db.Marca.findAll();
            })
            .then(function (marca) {
                response.marca = marca;
                return db.CategoriaProducto.findAll();
            })
            .then(function (categoria) {
                response.categoria = categoria;
                res.render('products/filtrado', {producto: response.producto, marca: response.marca, categoria: response.categoria});
            })
            .catch(function (error) {
                    res.send(error);
            });      
        }).catch(function (error) {
            res.send(error);
        });      
    },

    search: (req, res) => {
        let response={};
        let busqueda = req.query.busqueda;
        db.Producto.findAll({
            where: db.Sequelize.where(
                db.Sequelize.fn('LOWER', db.Sequelize.col('nombreProducto')), //Paso el campo a minsucula
                'LIKE',
                '%' + busqueda.toLowerCase() + '%' //Paso la busqueda a minuscula
                )
        })
        .then(function (producto) {
            response.producto = producto;
            return db.Marca.findAll();
        })
        .then(function (marca) {
            response.marca = marca;
            return db.CategoriaProducto.findAll();
        })
        .then(function (categoria) {
            response.categoria = categoria;
            res.render('products/filtrado', {producto: response.producto, marca: response.marca, categoria: response.categoria});
        })
        .catch(function (error) {
                res.send(error);
        });    
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;