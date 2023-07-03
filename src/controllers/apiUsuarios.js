// let db = require("../../dataBase/models")
// const Op = db.Sequelize.Op


// const infoUsuarios = {
//     info: (req,res)=>{
//         db.Usuario
//             .findAll()
//             .then(usuarios => {
//                 return res.json({
//                     total:usuarios.length,
//                     users: {
//                         id: usuarios.id,
//                         name: usuarios.nombre,
//                         email: usuarios.email,
//                         detail: ""
//                     }
//                 })
//             })
//     },

//     detalle: (req,res)=>{
//         db.Usuario
//             .findByPK(req.params.id)
//             .then(usuario => {
//                 return res.json({
//                     id: usuario.id,
//                     name: usuario.nombre,
//                     apellido: usuario.apellido,
//                     email: usuario.email,
//                     imagen: ""
//                 })
//             })
//     }
// }

// module.exports = infoUsuarios;