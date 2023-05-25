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
        tableName:'carrito', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    

    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = function(models){
        Carrito.belongsToMany(models.Producto,{
            as:"productos",
            through: models.CarritoProducto,
            foreignKey: "idCarrito",
            otherKey:"productos",
            timestamps:false
            
        
        });
        Carrito.belongsTo(models.Usuario,{
            as: "usuarios",
            foreignKey: "idUsuario",
            timestamps:false
        })
    }
    return Carrito;
}