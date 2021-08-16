const Booking = require('../models/Booking')
// const Property = require('../models/Property')
const Review = require('../models/Review')

const bookProperty = async(req, res) =>{
    let isPaid = true
   const {body} = req
   const newBooking = new Booking(body)
   await newBooking.save()
                .then(booking => {
                    res.status(201).json({msg:'successfully booked',data:body})  

                }).catch(err => {
                    res.status(500).json({msg:err})
                })
}

const getMyBookings = async(req, res) =>{
    let bookings = await Booking.find({_id: req.params.id})
    res.json(bookings)
}

module.exports = {bookProperty, getMyBookings}