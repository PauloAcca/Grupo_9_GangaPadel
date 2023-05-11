module.exports=(sequelize, dataTypes)=>{
    let alias= 'productos';
    let cols={
        idProducto:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        nombreProducto: {
            type: dataTypes.STRING,
        },
        precio: {
            type: dataTypes.INTEGER,
        },
        descuento:{
            type: dataTypes.INTEGER,
        },
        idCategoria: {
            type: dataTypes.INTEGER,
        },
        descripcion: {
            type: dataTypes.STRING,
        },
        idMarca:{
            type: dataTypes.STRING,
        },
        imagen:{
            type: dataTypes.STRING,
        }
    }
    let config={
        tableName:'productos', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    const Producto = sequelize.define(alias, cols, config);
    return Producto;
};