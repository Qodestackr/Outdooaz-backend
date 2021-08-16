const express = require('express')

const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/index'))

// db
const connection = require('./config/db.config')
connection.once('open', () => console.log('Connected to database instance'))
connection.on('error', () => console.error.bind(error,'Failed to connect to database instance'))

app.listen(process.env.PORT|| 5500, ()=>console.log(`Server running PORT : 5500`))