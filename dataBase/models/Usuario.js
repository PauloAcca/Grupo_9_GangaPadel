module.exports=(sequelize, dataTypes)=>{
    let alias= 'Usuario';
    let cols={
        idUsuario:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true, 
            allowNull:false,
            unique:true,
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull:false,
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull:false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        pasword: {
            type: dataTypes.STRING,
            allowNull:false,
        },
        tipoUsuario:{
            type:dataTypes.INTEGER,
            allowNull:false,
        }
    }
    let config={
        tableName:'usuarios', //No hace falta si la tabla es el plural del nombbre del archivo
        timestamps: false, //Son columnas de actualizacion de las tablas, sino las tenemos se pone false
    }
    const Usuario = sequelize.define(alias, cols, config);

 /*    Usuario.associate = function(models){
        Usuario.belongsTo(models.Carrito,{
            as:"usuarios",
            foreignKey:'IdUsuario',
            timestamps: false
        })
    } */
    return Usuario;

    
};