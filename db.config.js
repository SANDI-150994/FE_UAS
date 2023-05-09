const {Sequelize } = require('sequelize')

const sequelize = new Sequelize('carwash_app','root','',{
    dialect: 'mysql',
    host : 'localhost'
})

module.exports = sequelize