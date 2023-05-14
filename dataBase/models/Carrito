module.exports=(sequelize, dataTypes)=>{
    let alias= 'Carrito';
    let cols={
        idCarrito:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique:true,
            autoIncrement:true, 
            allowNull:false,
        },
        idUsuario: {
            type: dataTypes.INTEGER,
            allowNull:false,
            unique:true,
        },
        precio_total:{
            type: dataTypes.INTEGER,
            allowNull:false,
        }
    }
    let config={
        tableName:'carritos', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }

    const Carrito = sequelize.define(alias, cols, config);
    return Carrito;
};