const Contact = require('../models/contact');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
});

exports.handleList = async function(index, pageSize, pageNumber, query) {
    try {
        const resp = await client.search({
            index: index,
            type: 'contact',
            q: query
        });
        // Unfiltered results
        const hits = resp.hits.hits;
        const page = [];
        if(hits.length === 0) {
            return {resp: 'No results', status: 404};
        }
        // Make sure the requested page exists
        if((pageNumber - 1) * pageSize > hits.length) {
            return {resp: 'Page out of range', status: 416};
        }
        // Logic to contsruct results page
        for(let i = ((pageNumber - 1) * pageSize); i < (pageNumber * pageSize) && i < hits.length; i++) {
            page.push(hits[i]._source);
        }
        return {resp: page, status: 200};
    } catch (err) {
        return {resp: err, status: err.status}
    }
}

exports.handleCreate = async function (index, contact) {
    try {
        // Check for valid phone number
        if (contact.get('phoneNumber').length !== 10) {
            return {resp: 'Invalid phoneNumber', status: 400}
        }
        const resp = await client.create({
            index: index,
            type: 'contact',
            id: contact.get('name'),
            body: {
                name: contact.get('name'),
                phoneNumber: contact.get('phoneNumber'),
                email: contact.get('email'),
                address: contact.get('address'),
            }
        });
        return {resp: resp, status: 200}
    } catch (err) {
        return {resp: 'Contact already exists', status: err.status}
    }
}

exports.handleDetail = async function(index, name) {
    try {
        const resp = await client.search({
            index: index,
            type: 'contact',
            q: 'name:' + name
        });
        // Should only ever be one result if there is a result
        if (resp.hits.hits[0]) {
            const result = resp.hits.hits[0]._source
            return { resp: result, status: 200 }
        } else {
            return {resp: 'Contact does not exist', status: 404}
        }
    } catch(err) {
        return { resp: err, status: err.status };
    }
}

exports.handleUpdate = async function(index, name, contact) {
    try {
        // name is essentially acting as a primary key, so I have disallowed changing it 
        let doc = {};
        if (contact.get('phoneNumber')) {
            doc.phoneNumber = contact.get('phoneNumber');
        }
        if (contact.get('email')) {
            doc.email = contact.get('email');
        }
        if (contact.get('address')) {
            doc.address = contact.get('address');
        }
        const resp = await client.update({
            index: index,
            type: 'contact',
            id: name,
            body: {
                doc
            }
        });
        return {resp: resp, status: 200}
    } catch (err) {
        resp = {resp: err, status: 404}
        return resp;
    }
}

exports.handleDelete = async function(index, name) {
    try {
        const resp = await client.delete({
            index: index,
            type: 'contact',
            id: name
        });
        // Checking if deleted, if not then error
        if (resp.result === 'deleted') {
            return { resp: resp, status: 200 }
        } else {
            return {resp: 'Contact does not exist', status: 404}
        }
    } catch (err) {
        resp = {resp: err, status: 404}
        return resp;
    }
}