const mongoose = require("mongoose");


const PropertySchema = new mongoose.Schema({
    name: String, 
    description: String,
    image: String
})

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;