const express = require("express")
const app = express();
const path = require("path");

app.use(express.static(path.resolve(__dirname,"../public")))

app.listen(3030, ()=> console.log("El server escucha en el puerto 3030"))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/index.html"))
})

app.get("/inicioSesion",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/inicioSesion.html"))
})

