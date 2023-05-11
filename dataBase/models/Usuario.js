module.exports=(sequelize, dataTypes)=>{
    let alias= 'usuarios';
    let cols={
        idUsuario:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true, 
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
        tipoUsuario:{
            type:dataTypes.INTEGER
        }
    }
    let config={
        tableName:'usuarios', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario;
};