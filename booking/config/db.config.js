const mongoose = require('mongoose')

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/BookingDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('DB connected: Booking'))
.catch(err=>console.log(' db connection error: ', err))

const connection = mongoose.connection
module.exports = connection