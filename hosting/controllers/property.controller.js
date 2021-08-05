// const Property = require('../../models/Property')

const addProperty = (req, res) => {
    var description = req.body.description;
    var imageUrl = req.body.imageUrl;
    var user = req.user;

    var property = new Property({ description: description, imageUrl: imageUrl, owner: user.id });
    property.save()
        .then(function (savedProperty) {
            res.redirect('/properties/' + savedProperty.id);
        });
}


const getPropertyByID = (req, res) => {
    var propertyId = req.params.id;
    Property.findOne({ _id: propertyId }).then(function (property) {
        res.render('properties/show', { property: property });
    });
}

const getProperties = (req, res) => {
    Property.find().then(function (properties) {
        res.render('properties/index', { properties: properties });
    });
}

const getProperties = (req, res) => {
    Property.find().then(function (properties) {
        res.render('properties/new');
    });
}

const editProperty = (req, res) => {
    var propertyId = req.body.propertyId;

    Property.findOne({ _id: propertyId })
        .then(function (property) {
            property.description = req.body.description
            property.imageUrl = req.body.imageUrl

            return property.save()
        })
        .then(function (updatedProperty) {
            return res.redirect('/properties/' + updatedProperty.id)
        })
}

const deleteProperty = (req, res) => {
    var propertyId = req.body.propertyId

    Property.findOne({ _id: propertyId })
        .then(function (property) {
            property.description = req.body.description
            property.imageUrl = req.body.imageUrl

            return property.save()
        })
        .then(function (updatedProperty) {
            return res.redirect('/properties/' + updatedProperty.id)
        })
}

module.exports = {addProperty, getPropertyByID, getProperties, editProperty, deleteProperty }