function guestMiddleware(req,res,next){
    if (req.session.userLogged) {
        return res.redirect("/");
    }
    next();
}

module.exports = guestMiddleware

// middleware, si esta logeado un usuario no puede accerder de nuevo al login o register