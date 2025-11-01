const Sequelize = require('sequelize')
const connection = new Sequelize('MindSpace', 'root', 'escola',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = connection