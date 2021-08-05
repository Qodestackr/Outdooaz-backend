const express = require('express')
const path = require('path')

const multer = require('multer')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.listen(process.env.PORT|| 5200, ()=>console.log(`Server running PORT : 5200`))