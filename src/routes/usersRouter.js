let express = require('express');
let router = express.Router();
const usersController =  require("../controllers/usersController.js");
const authMiddleware = require("../middlewares/authMiddleware")
let db = require("../../dataBase/models")
const Op = db.Sequelize.Op

// API 
router.get("/api/users", (req, res) => {
    db.Usuario.findAll()
        .then(users => res.json(users))
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});
// api parametrizada
router.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    db.Usuario.findByPk(userId)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});
router.get('/productCart',usersController.carrito);
module.exports = router;