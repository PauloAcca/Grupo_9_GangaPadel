// Requerimos path para poder enviar los archivos HTML
const path = require('path');
// const { producto } = require('./productsController');
const fs=require('fs');
const archivo= path.join(__dirname,'..','data','productos.json');
const db = require('../../dataBase/models');
const { producto } = require('./productsController');
// Creamos el objeto literal con los métodos a exportar
const admController = {

     // Manejo del pedido get con ruta
    agregado: (req,res)=>{
         // comunicarse con el modelo, conseguir información
        res.render('adm/agregado');
    },
    editado:  (req,res)=>{
        // comunicarse con el modelo, conseguir información
        let idProducto= req.params.idProducto;

        let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        let producto= JSON.parse(archivoProductos);

        let productoEditar = producto[idProducto-1];

        res.render('adm/editado', {productoEditar:productoEditar});
    },

    editadoPut: (req,res) => {
        let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        let producto= JSON.parse(archivoProductos);

        producto[req.body.id] = req.body;
        res.redirect('/');
    },

    guardarProducto: (req,res)=>{
        console.log(req.body);
        db.Producto.create({
            nombreProducto: req.body.name,
            precio: req.body.price,
            descuento: req.body.discount,
            idCategoria: parseInt(req.body.category),
            descripcion: req.body.description,
            idMarca: parseInt(req.body.brand),
            image: req.file.filename,
        })
        .then(producto=>{
            res.redirect('/');
        })
        .catch(error =>{
            res.send(error)
        })
        

        // if (req.file){
        //     let producto = {
        //         id: null,
        //         name: req.body.name,
        //         price: req.body.price,
        //         discount: req.body.discount,
        //         category: req.body.category,
        //         description: req.body.description,
        //         brand: req.body.brand,
        //         image: req.file.filename,
        //     }
    
        //     //primero: leer que cosas ya habia;
        //     let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        //     let arrayProductos=[];
        //     if (archivoProductos==''){
        //         arrayProductos=[];
        //         producto.id=0;
        //     }else{
        //         arrayProductos = JSON.parse(archivoProductos);
        //         producto.id=arrayProductos.length;
        //     }
    
        //     arrayProductos.push(producto);
    
        //     productosJSON = JSON.stringify(arrayProductos);
    
        //     fs.writeFileSync(archivo,productosJSON);
    
        //     res.redirect('/');
        // }
        // else{
        //     res.redirect('/admin/add');
        // }
    },
    delete: (req,res)=>{
        let idProducto= req.params.idProducto;
        let archivoProductos = fs.readFileSync(archivo, {encoding:'utf-8'});
        let productosTodos= JSON.parse(archivoProductos);
        let productosFinal = productosTodos.filter(producto => producto.id != idProducto);
        productosJSON = JSON.stringify(productosFinal);
        fs.writeFileSync(archivo,productosJSON);
        res.redirect('/');
    }
}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports = admController;