const db = require('../../dataBase/models');

const usersController = {
    
     // Manejo del pedido get con ruta
    carrito: (req,res)=>{
        let response={};
        db.Marca.findAll()
        .then(function (marca) {
            response.marca = marca;
            return db.CategoriaProducto.findAll();
        })
        .then(function (categoria) {
            response.categoria = categoria;
            if (req.session.userLogged) {
                return db.Carrito.findOne({
                    where: {
                        idUsuario: req.session.userLogged.idUsuario
                    },include: [{ association: 'productos'},{association:'carritosProducto'}]
                }).then(carrito=>{
                    response.carrito= carrito;
                    res.render('users/carrito', {marca: response.marca, categoria: response.categoria, carrito: response.carrito});
                }).catch(function (error) {
                    res.send(error);
                });    
            }else{
                res.render('home/login');
            }
        }).catch(function (error) {
            res.send(error);
        });   
    },
    
    pagar: (req, res) => {
        let response = {};
        db.Marca.findAll()
        .then(function (marca) {
            response.marca = marca;
            return db.CategoriaProducto.findAll();
        })
        .then(function (categoria) {
            response.categoria = categoria;
            return db.Producto.findAll({include:[{ association: 'marcas' }, { association: 'categoriaProductos' }]});
        }).then(function(producto) {
            response.producto = producto;
            if (req.session.userLogged) {
                return db.Carrito.findOne({
                    where: {
                        idUsuario: req.session.userLogged.idUsuario
                    },
                })
                .then(carrito => {
                    return db.CarritoProducto.destroy({ where: { idCarrito: carrito.idCarrito } })
                    .then(() => {
                        res.render('home/', { marca: response.marca, categoria: response.categoria, producto: response.producto });
                    });
                })
                .catch(function (error) {
                    res.send(error);
                });
            } else {
                res.render('home/login');
            }
        })
        .catch(function (error) {
            res.send(error);
        });
    },


    agregar: (req, res) => {
        let idProducto = req.body.idProducto;
        let response = {};
        let cantidad = req.body.cantidad;
        if (req.session.userLogged) {
            let idUsuario = req.session.userLogged.idUsuario; // ID del usuario logeado
            db.Marca.findAll()
            .then(function (marca) {
                response.marca = marca;
                return db.CategoriaProducto.findAll();
            })
            .then(function (categoria) {
                response.categoria = categoria;
                return db.Carrito.findOne({
                    where: {
                        idUsuario: idUsuario,
                    },
                    include: [{ association: 'productos' }, { association: 'carritosProducto' }]
                });
            })
            .then((carrito) => {
                if (carrito) {
                    // El usuario ya tiene un carrito existente
                    response.carrito = carrito;
                    return db.CarritoProducto.create({
                        idCarrito: carrito.idCarrito,
                        idProducto: idProducto,
                        cant_producto: cantidad,
                    }).then((carritoProducto) => {
                        return Promise.all([
                            carrito.getProductos(), // Obtener los productos del carrito actualizados
                            carrito.getCarritosProducto(), // Obtener los carritoProducto actualizados
                        ]).then(([productos, carritosProducto]) => {
                            response.carrito.productos = productos;
                            response.carrito.carritosProducto = carritosProducto;
                            res.render('users/carrito', { marca: response.marca, categoria: response.categoria, carrito: response.carrito });
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    // El usuario no tiene un carrito existente, crear uno nuevo
                    return db.Carrito.create({
                        idUsuario: idUsuario,
                        precio_total: 0,
                    }).then((carrito) => {
                        response.carrito = carrito;
                        return db.CarritoProducto.create({
                            idCarrito: carrito.idCarrito,
                            idProducto: idProducto,
                            cant_producto: cantidad,
                        }).then((carritoProducto) => {
                            return Promise.all([
                                carrito.getProductos(), // Obtener los productos del carrito actualizados
                                carrito.getCarritosProducto(), // Obtener los carritoProducto actualizados
                            ]).then(([productos, carritosProducto]) => {
                                response.carrito.productos = productos;
                                response.carrito.carritosProducto = carritosProducto;
                                res.render('users/carrito', { marca: response.marca, categoria: response.categoria, carrito: response.carrito });
                            });
                        }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            res.render('home/login');
        }
    },
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usersController;