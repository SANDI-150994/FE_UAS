const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')

class Cucian extends Model { }

Cucian.init({
    nik : {
        type : DataTypes.INTEGER
    },
    kegiatan : {
        type : DataTypes.STRING
    },
    kendaraan:{
        type : DataTypes.STRING
    },
    jumlah:{
        type: DataTypes.INTEGER
    },
    status : {
        type : DataTypes.STRING
    },
    tanggal : {
        type : DataTypes.STRING
    }
},{
    sequelize,
    modelName : 'Cucian'
})

module.exports = Cucian