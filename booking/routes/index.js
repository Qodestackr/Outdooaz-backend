const express = require('express')
const router = express.Router()

const {bookProperty, getMyBookings} = require('../controllers/booking.controller')

router.route("/book").post(bookProperty)
router.route("/bookings/:bookingId").get(getMyBookings)


router.get('/', (req,res)=>res.send('Yooh Booker!'))

module.exports = router