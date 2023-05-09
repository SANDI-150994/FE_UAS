const express = require('express')
const sequelize = require('../db.config')
const router = express.Router()
const ModelCucian = require('../models/cucian')


//Endpoint Method GET / Search data
router.get('/aktif',async (req, res) => {
  const nik = req.query.nik;
   const { Op } = require("sequelize");
  const cucian = await ModelCucian.findAll({ 
    where: {
        [Op.and] : [
            {nik : nik},
            {status : 'aktif'}
        ]
        }
})
  res.status(200).json({
    status : 200,
    data : cucian,
    metadata : `menampilkan ${nik} on the List`
})

})

router.get('/selesai',async (req, res) => {
  const nik = req.query.nik;
   const { Op } = require("sequelize");
  const cucian = await ModelCucian.findAll({ 
    where: {
        [Op.and] : [
            {nik : nik},
            {status : 'selesai'}
        ]
        }
})
  res.status(200).json({
    status : 200,
    data : cucian,
    metadata : `menampilkan ${nik} on the List`
})

})

//SELECT * FROM `lists` a INNER JOIN mahasiswas b ON a.nim = b.nim;
router.post('/searchAktif', async(req, res) => {
    
    const {cari} = req.body
    const nik  = req.query.nik

    const { Op } = require("sequelize");
    const cucian = await ModelCucian.findAll({ 
        where: {
                    [Op.and] : [
                        { nik : nik },
                        {
                            kegiatan : {
                                [Op.like]: `%${cari}%`
                            }
                        },
                        {status : 'aktif'}
                    ]
                }
    })
    res.status(200).json({
        status: 200,
        data : cucian,
        metadata : `Search ${cari} on the List`
    })
})

router.post('/searchSelesai', async(req, res) => {
    
    const {cari} = req.body
    const nik  = req.query.nik

    const { Op } = require("sequelize");
    const cucian = await ModelCucian.findAll({ 
        where: {
                    [Op.and] : [
                        { nik : nik },
                        {
                            kegiatan : {
                                [Op.like]: `%${cari}%`
                            }
                        },
                        {status : 'selesai'}
                    ]
                }
    })
    res.status(200).json({
        status: 200,
        data : cucian,
        metadata : `Search ${cari} on the List`
    })
})

//Endpoint Method Post / Create Data
router.post('/', async(req, res) => {
    
    const {nik, kegiatan, kendaraan, jumlah, tanggal} = req.body
    
    const cucian = await ModelCucian.create({
        nik, kegiatan, kendaraan, jumlah, status: "aktif", tanggal
    })

    res.status(200).json({
        status : 200,
        data : cucian,
        metadata : "Tambah Pencucian berhasil"
    })
})

//Endpoint Method Put / Update Data
router.put('/', async(req, res) => {

    const id = req.query.id

    const {kegiatan,status,tanggal, kendaraan, jumlah} = req.body
  
    const cucian = await ModelCucian.update({
         kegiatan, status, tanggal, kendaraan, jumlah
    }, 
    { where: { id : id }})    
    
    res.status(200).json({
        status : 200,
        data: {updated: cucian[0]},
        metadata: "List Updated Successfuly!"
    })
   
})

router.put('/done', async(req, res) => {
    
    const id = req.query.id
  
    const cucian = await ModelCucian.update({
        status:'aktif'
    }, 
    { where: { id : id }})    
    
    res.status(200).json({
        status : 200,
        data: {updated: cucian[0]},
        metadata: "List Updated Successfuly!"
    })
   
})

//Endpoint Method Delete / Delete Data
router.delete('/', async(req, res) => {
    
    const id = req.query.id
  
    const cucian = await ModelCucian.destroy({
      where: { id : id }
    })    
    
    res.status(200).json({
        status : 200,
        data: cucian,
        metadata: "List Deleted Successfuly!"
    })
   
})

module.exports = router 