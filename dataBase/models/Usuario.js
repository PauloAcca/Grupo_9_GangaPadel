module.exports=(sequelize, dataTypes)=>{
    let alias= 'Usuario';
    let cols={
        id:{
            type: dataTypes.INTEGER,
        },
        nombre: {
            type: dataTypes.STRING,
        },
        apellido: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        password: {
            type: dataTypes.STRING,
        },
    }
    let config={
        tableName:'Usuarios', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario;
};