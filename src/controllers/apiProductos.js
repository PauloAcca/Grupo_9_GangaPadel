let db = require("../../dataBase/models")
const Op = db.Sequelize.Op

const infoProductos = {
    info: (req, res) => {
        db.Producto.findAll().then((productos) => {
          let countByCategory = {};
          let products = productos.map((producto) => ({
            id: producto.id,
            name: producto.nombre,
            description: producto.descripcion,
            detail: "",
          }));
      
          productos.forEach((producto) => {
            if (countByCategory[producto.idCategoria]) {
              countByCategory[producto.idCategoria]++;
            } else {
              countByCategory[producto.idCategoria] = 1;
            }
          });
      
          return res.json({
            total: productos.length,
            countByCategory: countByCategory,
            products: products,
          });
        });
      }
      ,

    detalle: (req,res)=>{
        db.Producto
            .findByPK(req.params.id)
            .then(producto => {
                return res.json({
                    id: usuario.id,
                    name: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    imagen: "",
                })
            })
    }
}

module.exports = infoUsuarios;