module.exports=(sequelize, dataTypes)=>{
    let alias= 'Usuario';
    let cols={
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true, 
        },
        nombre: {
            type: DataTypes.STRING,
        },
        apellido: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    }
    let config={
        tableName:'Usuarios', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario;
};