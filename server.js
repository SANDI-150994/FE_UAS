const express = require ('express')
const cors = require ('cors')
const port = 5000

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready!'))

const usersEndpoint = require('./routes/users')
const listEndpoint = require('./routes/cucian')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', usersEndpoint)
app.use('/list', listEndpoint)

app.listen(port,  () => console.log(`running server on port ${port}`)) 