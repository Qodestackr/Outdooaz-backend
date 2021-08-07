const Booking = require('../models/Booking')
// const Property = require('../models/Property')
const Review = require('../models/Review')

const bookProperty = async(req, res) =>{
    let isPaid = true;
    let property = {
        name: "house1",
        desc: "house1 desc...",
        price: 1000,
    }
    res.json({msg:'successfully booked',data:property})  
}

const getMyBookings = async(req, res) =>{
    let bookings = await Booking.find({_id: req.params.id})
    res.json(bookings)
}

module.exports = {bookProperty, getMyBookings}