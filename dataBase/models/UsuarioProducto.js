module.exports=(sequelize, dataTypes)=>{
    let alias= 'CarritoProductos';
    let cols={
        idUsuario:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique:true,
        },
        idProducto:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            unique:true,
            allowNull:false,
        },
        cant_producto:{
            type: dataTypes.INTEGER,
            primaryKey: true, 
            allowNull:false,
        }
    }
    let config={
        tableName:'usuarioproductos', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }

 /*    const CarritoProducto = sequelize.define(alias, cols, config);
    CarritoProducto.associate = function(models){
        CarritoProducto.belongsTo(models.Producto,{
            as:"productos",
            foreignKey: "idProducto",
            timestamps:false

        });
        CarritoProducto.belongsTo(models.Carrito,{
            as: "carritos",
            foreignKey: "idCarrito",
            timestamps:false
        })
    } */
    return CarritoProducto;
};