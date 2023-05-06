module.exports=(sequelize, dataTypes)=>{
    let alias= 'Producto';
    let cols={
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        discount:{
            type: DataTypes.INTEGER,
        },
        category: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        brand:{
            type: DataTypes.STRING,
        },
        image:{
            type: DataTypes.STRING,
        }
    }
    let config={
        tableName:'Productos', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    const Producto = sequelize.define(alias, cols, config);
    return Producto;
};