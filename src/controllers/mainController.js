// Requerimos path para poder enviar los archivos HTML
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
let db = require("../../dataBase/models")

// Creamos el objeto literal con los métodos a exportar
const mainController = {

    // Manejo del pedido get con ruta
    index: (req, res) => {
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
                res.render('home/index', { producto: response.producto, marca: response.marca, categoria: response.categoria });
            })
            .catch(function (error) {
                return res.send(error)
            });
    },

    //Repito proceso para todas las vistas
    login: (req, res) => {
        res.render('home/login');
    },
    loginProcess: (req, res) => {
        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((userToLogin) => {
                console.log(userToLogin)
                if (userToLogin) {
                    let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.pasword);
                    if (isOkThePassword) {
                        delete userToLogin.password;
                        req.session.userLogged = userToLogin;

                        if (req.body.recordar) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
                        }
                        return res.redirect('/')
                    }
                    return res.render('home/login', {
                        errors: {
                            email: {
                                msg: 'Credenciales invalidas'
                            }
                        }
                    })
                }
                return res.render('home/login', {
                    errors: {
                        email: {
                            msg: 'No se encuentra registrado'
                        }
                    }
                })
            })

    },
    registro: (req, res) => {
        res.render('home/registro');
    },
    processRegister: (req, res) => {
        db.Usuario.findOne({
            where: {
                email:req.body.email
            }
        })
        .then(userInDB => {
            let resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('home/registro', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                });
            }
            if (userInDB) {
                return res.render('home/registro', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
    
            return db.Usuario.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                pasword: bcrypt.hashSync(req.body.password1, 10),
                tipoUsuario: 0,
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(error => {
                res.send(error);
            });
        })
        .catch(error => {
            res.send(error);
        });
    },
    logOut: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    editarUsuario: (req, res) => {
        // db.Usuarios.findOne({
        //     where: {
        //         email: req.body.email
        //     }
        // })
        // .then((usuarioEditar) => {
        //     res.render('users/editarUsuario', {usuarioEditar});
        // })

    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;
