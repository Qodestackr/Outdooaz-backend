const mongoose = require('mongoose')

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/PropertyHostDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log(' db connected '))
.catch(err=>console.log(' db connection error: ', err))

const connection = mongoose.connection

module.exports = connection