const express = require("express")
const app = express();
const path = require("path");

app.use(express.static(path.resolve(__dirname,"../public")))

app.use(express.static(path.resolve(__dirname,"./views")))

app.listen(3030, ()=> console.log("El server escucha en el puerto 3030"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/index.html"))
})

app.get("/inicioSesion",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/inicioSesion.html"))
})

app.get("/registro",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/registro.html"))
})

app.get("/producto",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/producto.html"))
})

app.get("/listaDeseos",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/listaDeseos.html"))
})

/* Provisionales */
app.get("/footer",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/footer.html"))
})
app.get("/header",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/header.html"))
})