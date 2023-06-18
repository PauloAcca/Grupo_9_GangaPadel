module.exports=(sequelize, dataTypes)=>{
    let alias= 'CategoriaProducto';
    let cols={
        idCategoria:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique:true,
            allowNull:false,
        },
        categoria: {
            type: dataTypes.STRING,
            allowNull:false,
        },
    }
    let config={
        tableName:'categoria_producto', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }

    const CategoriaProducto = sequelize.define(alias, cols, config);
    return CategoriaProducto;
};