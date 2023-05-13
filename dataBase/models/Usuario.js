module.exports=(sequelize, dataTypes)=>{
    let alias= 'Usuarios';
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
        }
    }
    let config={
        tableName:'Usuarios', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    const Usuario = sequelize.define(alias, cols, config);

    // Usuario.associate = function(models){
    //     Usuario.belongsToMany(models.Productos,{
    //         as:"productos",
    //         through:"usuario_productos",
    //         foreignKey:'productosID',
    //         otherKey:'idUsuario',
    //         timestamps: false
    //     })
    // }
    return Usuario;
};