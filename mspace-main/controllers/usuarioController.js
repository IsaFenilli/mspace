const bcrypt = require("bcrypt")
const Usuario = require("../models/Usuario")

const cadastrarUsuario = (req, res) =>{
    const {nome, email, senha} = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    Usuario.findOne({where: {email}})
        .then((usuarioExistente) =>{
            if(usuarioExistente){
                throw {status: 400, message: "Email já cadastrado"}
            }
            return bcrypt.hash(String(senha), 10)
    })
    .then((senhaHash) =>{
        return Usuario.create({nome, email, senha: senhaHash});
    })
    .then((novoUsuario) =>{
        res.status(201).json({menssage: "Usuario ja cadastrado com sucesso", usuario: novoUsuario})
    })
    .catch((error) =>{
        if(error.status){
            return res.status(error.status).json({ error: error.message }); //Retorna erro amigável para o cliente
        }
        console.log("Erro ao cadastrar usuario: ", error)
        res.status(500).json({error: "Error interno do servidor"})
    })
}

module.exports = { cadastrarUsuario };