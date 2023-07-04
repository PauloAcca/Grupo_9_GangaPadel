// Requerimos path para poder enviar los archivos HTML
const db = require('../../dataBase/models');
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
        let minimo = req.query.minimo;
        let maximo = req.query.maximo;
        let marca = req.query.marca;
        console.log(marca)
        let categoria = req.query.categoria;
        console.log(categoria)
        db.Producto.findAll({
            where: {
                // precio: {
                //     [db.Sequelize.Op.between]: [minimo, maximo] // Filtrar por rango de precios
                // },
                idMarca: marca, // Filtrar por marca
                idCategoria: categoria // Filtrar por categoría
            },include:[{ association: 'marcas' }, { association: 'categoriaProductos' }]
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
            res.render('products/filtrado', {producto: response.resultados, marca: response.marca, categoria: response.categoria})
        }).catch(function(error){
            res.send(error);
        })
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