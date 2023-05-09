const express = require('express')
const router = express.Router()
const Modelusers = require('../models/users')
const bycrypt = require('bcrypt')
const passwordcheck = require('../utils/passwordcheck')

//endpoint utama Method Get / Read Data
router.get('/', async(req, res) => {
    const users = await Modelusers.findAll()
    res.status(200).json({
        data : users,
        metadata : "Get All Data users"
    })
})

//Endpoint Method Post / Create Data
router.post('/', async(req, res) => {
    
    const {nik, nama, password} = req.body
    
    const encryptedPassword = await bycrypt.hash(password, 10)

    const users = await Modelusers.create({
        nik, nama, password: encryptedPassword
    })

    res.status(200).json({
        status : 200,
        data : users,
        metadata : "Post Data users"
    })
})

//endpoint method Post / Login Mahasiswa
router.post('/login', async(req, res) => {
    const {nik, password} = req.body

    const check = await passwordcheck(nik, password)
    
    if(check.compare === true){
        res.status(200).json({
            status : 200,
            users : check.dataMahasiswa,
            metadata: "Login Berhasil"
        })
    }else{
        res.status(400).json({
            error: "Data Invalid"
        })
    }
})

//Endpoint Method Put / Update Data Mahasiswa
router.put('/', async(req, res) => {
    
    const {nik, nama, password, passwordBaru} = req.body
  
    const check = await passwordcheck(nik, password)

    const encryptedPassword = await bycrypt.hash(passwordBaru, 10)

    // res.json({userData})
    if(check.compare === true){
        const users = await Modelusers.update({
            nama, password : encryptedPassword
        }, { where: { nik: nik }})    
        res.status(200).json({
            status : 200,
            users: {updated: users[0]},
            metadata: "Updates Data users"
        })
    }else{
        res.status(400).json({
            "error": "data invalid"
        })
    }
 
})


//Endpoint Method Delete / Delete Data Mahawaswa
router.delete('/', async(req, res) => {
    
    const {nik} = req.body
  
    const list = await Modelusers.destroy({
      where: { nik : nik }
    })    
    
    res.status(200).json({ 
        data: {Deleted: list[0]},
        metadata: "Destroy Data users"
    })
   
})

module.exports = router