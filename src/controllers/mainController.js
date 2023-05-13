// Requerimos path para poder enviar los archivos HTML
const path = require('path')
const fs=require('fs');
const { json } = require('express');
const archivo = path.join(__dirname,'..','data','productos.json');
const archivoUsers = path.join(__dirname,'..','data','usuarios.json');
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
let db = require("../../dataBase/models")

// Creamos el objeto literal con los métodos a exportar
const mainController = {

     // Manejo del pedido get con ruta
    index: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        let producto= JSON.parse(archivoProductos);
        res.render('home/index', {producto: producto});
    },

    //Repito proceso para todas las vistas
    login: (req,res)=>{
        res.render('home/login');
    },
    loginProcess:(req,res)=>{
        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((userToLogin) =>{
            if (userToLogin) {
                let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if(isOkThePassword){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin ;

                    if (req.body.recordar) {
                    res.cookie('userEmail', req.body.email, {maxAge:(1000 * 60) * 2})
                }
                return res.redirect('/')
                }
                return res.render('home/login',{
                errors: {
                    email:{
                        msg:'Credenciales invalidas'
                    }
                }
            })
        }
        return res.render('home/login',{
            errors: {
                email:{
                    msg:'No se encuentra registrado'
                }
            }
        })
        })
        
    },
    registro: (req,res)=>{
        res.render('home/registro');
    },
    processRegister: (req,res)=>{
        let userInDB = User.findByField('email', req.body.email);
        let resultValidation= validationResult(req);
        if (resultValidation.errors.length>0){
            return res.render('home/registro', {
                //convierte el array en objeto litereal con los nombres del formulario
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        }
        if(userInDB){
            return res.render('home/registro',{
                errors:{
                    email:{
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            })
        }
        db.Usuarios.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password1, 10)
        })
        return res.redirect('/login')
    },
    logOut: (req,res)=>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    editarUsuario: (req,res)=>{
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
