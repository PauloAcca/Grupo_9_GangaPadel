function authMiddleware(req,res,next){
    if (!req.session.userLogged) {
        return res.redirect("/users/wishlist");
    }
    
    next();
}

module.exports = authMiddleware