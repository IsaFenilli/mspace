const Sequelize = require("sequelize")
const connection = require("./database")

const Usuario = connection.define('usuario',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING(100),
        allowNull: false,
        validate:{
            notEmpty: true //Evita strings vazias
        }
    },
    email:{
        type: Sequelize.STRING(100),
        allowNull:false,
        unique: true,
        validate:{
            isEmail: true
        },
    },
    senha:{
        type: Sequelize.STRING(255),
        allowNull: false

    },
    dataCriacao:{
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW // Define automaticamente a data/hora atual
    }
});


Usuario.sync({force: false}).then(() =>{console.log("tabela criada")})
module.exports = Usuario;