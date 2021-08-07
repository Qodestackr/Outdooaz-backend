const mongoose =  require('mongoose')

const {Schema} = mongoose

const reviewSchema = new Schema({
    rating: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }  
})

module.exports = mongoose.model('Review', reviewSchema)