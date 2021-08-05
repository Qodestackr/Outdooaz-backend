const mongoose =  require('mongoose')

const {Schema} = mongoose

const propertySchema = new Schema({

    roomTitle:{
        type: String,
        default: '',
        required: true
    },

    roomSummary:{
        type: String,
        default: '',
        required: true
    },

    totalBedrooms: {
        type: Number,
        required: true
    },

    totalBathrooms:{
        type: Number,
        required: true   
    },
    address:{
        
    },
    hasKitchen: {
        type: Boolean,
        default: false
    },
    hasTv:{
        type: Boolean,
        default: false
    },
    hasHeating: {
        type: Boolean,
        default: false
    },
    hasInternet: {
        type: Boolean,
        default: false
    },
    hasAirConditioner: {
        type: Boolean,
        default: false
    },
    hasWasher: {
        type: Boolean,
        default: false
    },
    hasDryer: {
        type: Boolean,
        default: false
    },
    price_per_night: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },

    mediaUrl: {
        type: String, default: ''
    },

    location: {
        lat: {
          type: String,
          default: ''
        },
        lng: {
          type: String,
          default: ''
        }
      },
    category: {
        type: String,
        default: ''
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

module.exports = mongoose.model('Property', propertySchema)

/*
Entire place
Guests will have the whole place to themselves, including a private entrance and no shared spaces.
An entire place usually includes a bedroom, a bathroom, and a kitchen.
Do make sure to note if you’ll be on the property (for example, “Host occupies first floor of the home").
Private room
Guests will have their own private room for sleeping.
Other areas, such as a kitchen or living room, could be shared.
Do guests have their own bathroom? Note it in the description if they do—or don’t.
Shared room
Guests will be sleeping in a bedroom or a common area that could be shared with others.
It helps to note how many people they might be sharing with.
*/