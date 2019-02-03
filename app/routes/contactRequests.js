const Contact = require('../models/contact');
const contactController = require('../controllers/contactController');

// Called by GET /contact?pageSize={}&page={}&query={}
exports.contact_list = function(req, res) {
    console.log('Listing Contacts')
    let pageSize = req.query.pageSize;
    let page = req.query.page;
    let query = req.query.query;
    handleList(pageSize, page, query);
    res.status(200).send(req.body)
};

// Called by POST /contact
exports.contact_create = async function(req, res) {
    console.log('Creating new Contact')
    contact = new Contact(req.body);
    let resp = await contactController.handleCreate('addressbook', contact);
    res.status(resp.status).send(resp.resp);
}

// Called by GET /contact/{name}
exports.contact_detail = async function(req, res) {
    console.log('Retrieving specified Contact');
    let name = req.params.id
    let resp = await contactController.handleDetail('addressbook', name);
    res.status(resp.status).send(resp.resp);
}

// Called by PUT /contact/{name}
exports.contact_update = async function(req, res) {
    console.log('Updating specified Contact');
    let name = req.params.id
    contact = new Contact(req.body);
    let resp = await contactController.handleUpdate('addressbook', name, contact);
    res.status(resp.status).send(resp.resp);
}

// Called by DELETE /contact/{name}
exports.contact_delete = async function(req, res) {
    console.log('Deleting specified Contact');
    let name = req.params.id
    let resp = await contactController.handleDelete('addressbook', name);
    res.status(resp.status).send(resp.resp);
}
