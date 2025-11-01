const express = require("express");
const { cadastrarUsuario } = require("../controllers/usuarioController");

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post("/cadastro", cadastrarUsuario);

module.exports = router;

////////////////////////////////////////////



// Modelo de Usuário
const usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, 
      validate: {
        isEmail: true,  
      },
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'usuarios',
    timestamps: false
  });
  
  module.exports = Usuario;
  
  
  const bcrypt = require('bcryptjs');
  const { body, validationResult } = require('express-validator');
  const Usuario = require('./models/Usuario'); // Importar modelo de usuário
  
  // Rota de cadastro de usuário
  app.post('/cadastro', [
    // Validação de email e senha
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
  ], async (req, res) => {
    // Verificar se a validação passou
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
  
    const { email, senha, nome } = req.body;
  
    // Verificar se o email já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'Já existe um usuário com esse email' });
    }
  
    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);
  
    try {
      // Criar novo usuário
      const novoUsuario = await Usuario.create({
        email,
        senha: senhaCriptografada,
        nome,
      });
  
      // Retornar usuário criado (sem a senha)
      res.status(201).json({
        id: novoUsuario.id,
        email: novoUsuario.email,
        nome: novoUsuario.nome
      });
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: e.message });
    }
  });
  
  
  const jwt = require('jsonwebtoken');
  
  // Rota de login de usuário
  app.post('/login', [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').notEmpty().withMessage('A senha é obrigatória')
  ], async (req, res) => {
    // Verificar se a validação passou
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
  
    const { email, senha } = req.body;
  
    try {
      // Buscar usuário pelo email
      const usuario = await Usuario.findOne({ where: { email } });
  
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
  
      // Verificar se a senha está correta
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
  
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Senha incorreta' });
      }
  
      // Gerar o token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email }, 
        'secreto', // chave secreta, pode ser movida para um arquivo de configuração
        { expiresIn: '1h' } // Expiração de 1 hora
      );
  
      // Retornar o token
      res.json({ token });
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao fazer login', detalhe: e.message });
    }
  });
  
  const jwt = require('jsonwebtoken');
  
  // Middleware para verificar o token JWT
  function verificarAutenticacao(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }
  
    jwt.verify(token, 'secreto', (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: 'Token inválido' });
      }
      req.usuario = decoded;
      next();
    });
  }
  