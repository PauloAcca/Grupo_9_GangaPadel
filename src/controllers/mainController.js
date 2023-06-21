// Requerimos path para poder enviar los archivos HTML
const path = require('path')
const fs = require('fs');
const { json } = require('express');
const archivo = path.join(__dirname, '..', 'data', 'productos.json');
const archivoUsers = path.join(__dirname, '..', 'data', 'usuarios.json');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
let db = require("../../dataBase/models")

// Creamos el objeto literal con los métodos a exportar
const mainController = {

    // Manejo del pedido get con ruta
    index: (req, res) => {
        db.Producto.findAll({ include: [{ association: 'marcas' }, { association: 'categoriaProductos' }] })
            .then(function (producto) {
                res.render('home/index', { producto: producto });
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
        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((userToLogin) => {
                if (userToLogin) {
                    let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
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
                console.log(userInDB)
                let resultValidation = validationResult(req);
                if (resultValidation.errors.length > 0) {
                    return res.render('home/registro', {
                        //convierte el array en objeto litereal con los nombres del formulario
                        errors: resultValidation.mapped(),
                        oldData: req.body,
                    })
                }
                if (userInDB) {
                    return res.render('home/registro', {
                        errors: {
                            email: {
                                msg: 'Este email ya esta registrado'
                            }
                        },
                        oldData: req.body
                    })
                }


                return db.Usuario.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    pasword: bcryptjs.hashSync(req.body.password1, 10),
                    tipoUsuario: 0,
                })
            })

            .then(() => {
                res.redirect('/');
            })
            .catch(error => {
                res.send(error)
            })
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
