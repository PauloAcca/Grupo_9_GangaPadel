function guestMiddleware(req,res,next){
    if (req.session.userLogged) {
        return res.redirect("/adm/agregado");
    }
    next();
}

module.exports = guestMiddleware