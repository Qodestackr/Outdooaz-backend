const mongoose =  require('mongoose')

const {Schema} = mongoose

const bookingSchema = new Schema({
    bookingDate: {
        type: Date,
        default: Date.now
    },
    checkInDate: {
        type: Date,
        default: Date.now
    },
    checkOutDate: {
        type: Date,
        default: Date.now
    },
    status: { type: String, default: 'pending' },
    totalPrice: {
        type: Number,
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property'
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('Booking', bookingSchema)