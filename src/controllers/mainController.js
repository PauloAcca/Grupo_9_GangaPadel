// Requerimos path para poder enviar los archivos HTML
const path = require('path')
const fs=require('fs');
const { json } = require('express');
const archivo= path.join(__dirname,'..','data','productos.json');
const archivoUsers =path.join(__dirname,'..','data','usuarios.json');

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

    registro: (req,res)=>{
        res.render('home/registro');
    },
    
    newUser: (req,res) =>{
        let usuario = {
            id: null, 
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            password: req.body.password1, //modificar
            profileType: null,
        }
        let archivoUsuario = fs.readFileSync(archivoUsers,{encoding:'utf-8'});
        let usuarios = [];
        if (archivoUsuario == ''){
            usuarios = [];
            
        }else{
            usuarios = JSON.parse(archivoUsuario);
        }
        
        usuarios.push(usuario);
        usuarioJSON = JSON.stringify(usuarios);
        fs.writeFileSync(archivoUsers,usuarioJSON);//creo que el error está aca
        res.redirect('/');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = mainController;