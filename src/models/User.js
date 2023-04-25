const { Console } = require('console');
const fs = require('fs');
const { all } = require('../routes/usersRouter');

const User = {
    // Arichivo que estoy usando
    fileName:'./database/users.json',
    // Obtengo la info y la hago un string
    getData:function () {
        return JSON.parse(fs.readFileSync(this.fileName,'utf-8'));
    },
    //genera un id para mis usuarios nuevos
    generateId: function(){
        let allUsers = this.findAll(); 
        let lastUser = allUsers.pop()
        if(lastUser){
            return lastUser.id + 1
        }
        return 1
    },
    // Busca todos los usuarios
    findAll: function () {
        return  this.getData();
    },
    // Busca un usuario por su Id
    findByPk:function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound
    },
    // Busca un usuario por su campo 
    findByField:function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound
    },
    // Crea un usuario
    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id:this.generateId(),
            ...userData
        } 
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return true;
    },
    // Borra un usuario
    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}
module.exports = User;