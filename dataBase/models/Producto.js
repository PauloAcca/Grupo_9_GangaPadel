module.exports = (sequelize, dataTypes) => {
    let alias = 'Productos';
    let cols = {
        idProducto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        descuento: {
            type: dataTypes.INTEGER,
            defaultValue: null,
        },
        descripcion: {
            type: dataTypes.STRING,
            defaultValue: null,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        nombreProducto: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        idMarca: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        
        idCategoria: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'productos', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }

    const Producto = sequelize.define(alias, cols, config);

    /* Producto.associate = function (models) {
        Producto.belongsTo(models.CategoriaProducto, {
            as: "categoriaProductos",
            foreignKey: 'idCategoria',
            timestamps: false,

        })

        Producto.hasMany(models.Carrito, {
            as: "carritos",
            through: models.CarritoProducto,
            foreignKey: 'idCarrito',
            otherKey:"idProducto",
            timestamps:false,
        })

        Producto.belongsTo(models.Marca, {
            as: "marcas",
            foreignKey: 'idMarca',
            timestamps: false,

        })
    } */
    return Producto;
}




