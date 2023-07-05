module.exports=(sequelize, dataTypes)=>{
    let alias= 'Carrito';
    let cols={
        idCarrito:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique:true,
            allowNull:false,
            autoIncrement:true, 
        },
        idUsuario:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique:true,
            allowNull:false,
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

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuario,{
            as:"usuarios",
            foreignKey:'idUsuario',
            timestamps: false,
        })

        Carrito.belongsToMany(models.Producto, {
            as: "productos",
            through: {model: 'carrito_producto'},
            foreignKey: 'idCarrito',
            otherKey:"idProducto",
            timestamps:false,
        })
    }
    return Carrito;
};