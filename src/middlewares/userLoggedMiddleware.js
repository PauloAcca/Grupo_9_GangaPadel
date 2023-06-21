
function userLoggedMiddleware(req,res,next){
    res.locals.isLogged = false ;

    if (req.cookies && req.cookies.userEmail ) {
        let userFromCookie = User.findByField('email', req.cookies.userEmail);
        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        } 
    }
   
    if (req.session.userLogged) {
        res.locals.isLogged = true ;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware

// middleware que determina si un usuario esta logeado o no, 
// algunas cosas aparecen si estas logeado y otras no