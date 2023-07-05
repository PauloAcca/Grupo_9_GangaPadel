const Usuario = require('../../dataBase/models');
function verificarUsuario(req,res,next){
    if(req.session.userLogged){
        let tipoUsuarioOn = req.session.userLogged.tipoUsuario;
        if(tipoUsuarioOn === 1){
        next();
        }else{
        res.redirect('/');
        }
    }else{
        res.redirect('/');
    }
    
}

module.exports = verificarUsuario;