module.exports=(sequelize, dataTypes)=>{
    let alias= 'Producto';
    let cols={
        idProducto:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            unique:true,
            allowNull:false,
        },
        nombreProducto: {
            type: dataTypes.STRING,
            allowNull:false,
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull:false,
        },
        descuento:{
            type: dataTypes.INTEGER,
            defaultValue:null,
        },
        idCategoria: {
            type: dataTypes.INTEGER,
            allowNull:false,
        },
        descripcion: {
            type: dataTypes.STRING,
            defaultValue:null,
        },
        idMarca:{
            type: dataTypes.STRING,
            allowNull:false,
        },
        image:{
            type: dataTypes.STRING,
            allowNull:false,
        }
    }
    let config={
        tableName:'productos', //No hace falta si la tabla es el plural del nombbre del archivo
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