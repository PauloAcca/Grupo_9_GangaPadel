// Requerimos path para poder enviar los archivos HTML
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

    search: (req, res) => {
    let busqueda = req.query.busqueda;
        db.Producto.findAll({
            where: db.Sequelize.where(
                db.Sequelize.fn('LOWER', db.Sequelize.col('nombreProducto')), //Paso el campo a minsucula
                'LIKE',
                '%' + busqueda.toLowerCase() + '%' //Paso la busqueda a minuscula
                )
        })
        .then(function (producto) {
            res.render('products/filtrado', {producto:producto});
        })
        .catch(function (error) {
                console.log(error);
        });    
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = productsController;