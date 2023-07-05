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
            res.render('users/carrito', {marca: response.marca, categoria: response.categoria});
        })
        .catch(function (error) {
                res.send(error);
        });    
    },

    agregar: (req,res)=>{
        let idProducto = req.body.idProducto;
        let cantidad = req.body.cantidad;
        if(req.session.userLogged){
            let userId = req.session.userLogged.idUsuario; // ID del usuario logeado
            db.Carrito.findOne({
                where: {
                    idUsuario: userId
                }
            })
        }else{
            res.render('home/login')
        }
        
    },
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = usersController;