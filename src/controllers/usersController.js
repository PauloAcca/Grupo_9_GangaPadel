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
                    },include: [{ association: 'productos' }]
                }).then(carrito=>{
                    response.carrito= carrito;
                    console.log(carrito.productos)
                    res.render('users/carrito', {marca: response.marca, categoria: response.categoria});
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
                });
            })
            .then((carrito) => {
                if (carrito) {
                // El usuario ya tiene un carrito existente
                    return db.CarritoProducto.findOne({
                        where:{
                            idCarrito: carrito.idCarrito,
                            idProducto: idProducto,
                        }
                    }).then((carritoProducto) =>{
                        if(carritoProducto){
                            res.render('users/carrito', {marca: response.marca, categoria: response.categoria})
                        }else{
                            return db.CarritoProducto.create({
                                idCarrito: carrito.idCarrito,
                                idProducto: idProducto,
                                cant_producto: cantidad,
                            }).then((carritoProducto)=>{
                                res.render('users/carrito', {marca: response.marca, categoria: response.categoria})
                            }).catch((error)=>{
                                console.log(error)
                            })
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
                } else {
                // El usuario no tiene un carrito existente, crear uno nuevo
                return db.Carrito.create({
                    idUsuario: idUsuario,
                    precio_total: 0,
                }).then((carrito) => {
                    return db.CarritoProducto.findOne({
                        where:{
                            idCarrito: carrito.idCarrito,
                            idProducto: idProducto,
                        }
                    }).then((carritoProducto) =>{
                        if(carritoProducto){
                            res.render('users/carrito', {marca: response.marca, categoria: response.categoria})
                        }else{
                            return db.CarritoProducto.create({
                                idCarrito: carrito.idCarrito,
                                idProducto: idProducto,
                                cant_producto: cantidad,
                            }).then((carritoProducto)=>{
                                res.render('users/carrito', {marca: response.marca, categoria: response.categoria})
                            }).catch((error)=>{
                                console.log(error)
                            })
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
                });
                }
            })
            .catch((error) => {
                console.log(error);
                res.send('error');
            });
        } else {
            res.render('home/login');
        }
    },
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usersController;