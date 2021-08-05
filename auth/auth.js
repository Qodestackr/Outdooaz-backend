const express = require('express')

const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(process.env.PORT|| 5000, ()=>console.log(`Server running PORT : 5000`))