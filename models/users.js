const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')

class Users extends Model { }

Users.init({
    nik : {
        type : DataTypes.INTEGER,
        unique : true
    },
    nama : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    }
},{
    sequelize,
    modelName : 'Users'
})

module.exports = Users