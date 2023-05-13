module.exports=(sequelize, dataTypes)=>{
    let alias= 'Productos';
    let cols={
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        name: {
            type: dataTypes.STRING,
        },
        price: {
            type: dataTypes.INTEGER,
        },
        discount:{
            type: dataTypes.INTEGER,
        },
        category: {
            type: dataTypes.STRING,
        },
        description: {
            type: dataTypes.STRING,
        },
        brand:{
            type: dataTypes.STRING,
        },
        image:{
            type: dataTypes.STRING,
        }
    }
    let config={
        tableName:'Productos', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    const Producto = sequelize.define(alias, cols, config);

    // Producto.associate = function(models){
    //     Producto.hasMany(models.Usuarios,{
    //         as:"usuarios",
    //         foreignKey:'usuariosID'
    //     })
    // }
    return Producto;
};