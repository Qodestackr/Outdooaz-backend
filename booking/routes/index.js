const express = require('express')
const router = express.Router()

const {bookProperty, getMyBookings, bookings} = require('../controllers/booking.controller')

router.route("/book").post(bookProperty)

router.route("/bookings/:bookingId").get(getMyBookings)

router.route("/bookings").get(bookings)

router.get('/', (req,res)=>res.send('Yooh Booker!'))

module.exports = router