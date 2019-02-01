const Contact = require('../models/contact');

// Called by GET /contact?pageSize={}&page={}&query={}
exports.contact_list = function(req, res) {
    console.log('Listing Contacts')
    console.log(req.body);
    res.status(200).send(req.body)
};

// Called by POST /contact
exports.contact_create = function(req, res) {
    console.log('Creating new Contact')
    console.log(req.body);
    res.status(200).send(req.body)
}

// Called by GET /contact/{name}
exports.contact_detail = function(req, res) {
    console.log('Retrieving specified Contact');
    console.log(req.body);
    res.status(200).send(req.body)
}

// Called by PUT /contact/{name}
exports.contact_update = function(req, res) {
    console.log('Updating specified Contact');
    console.log(req.body);
    res.status(200).send(req.body)
}

// Called by DELETE /contact/{name}
exports.contat_delete = function(req, res) {
    console.log('Deleting specified Contact');
    console.log(req.body);
    res.status(200).send(req.body)
}