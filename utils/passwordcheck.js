const bycrypt = require('bcrypt')   
const ModelUsers = require('../models/users')

const passwordcheck = async(nik, password) => {
    const dataUsers  = await ModelUsers.findOne({ where: { nik: nik } })  
    const compare = await bycrypt.compare(password, dataUsers.password)
    return {compare, dataUsers}
}

module.exports = passwordcheck 