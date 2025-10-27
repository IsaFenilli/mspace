const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./models/database")
const Usuario = require("./models/Usuario")
const usuarioRoutes = require("./routes/usuarioRoutes")
//DATABASE
connection
    .authenticate()
    .then(()=>{
        console.log("conexão feita com o banco de dados!")
    })
    .catch((msgErro) =>{
        console.log(msgErro)
    })
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


app.use("/api/usuarios", usuarioRoutes);

app.listen(8080, ()=>{
    console.log("API RODANDO")
})