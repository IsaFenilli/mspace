const express = require("express");
const { cadastrarUsuario } = require("../controllers/usuarioController");

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post("/cadastro", cadastrarUsuario);

module.exports = router;