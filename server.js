const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const user = require('./routes/user')
require('./db/connect')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/user',user)

app.listen(PORT, err => err!=undefined?console.log(err.message):console.log(`server up at ${PORT}`))