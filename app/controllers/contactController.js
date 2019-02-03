const Contact = require('../models/contact');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
});

exports.handleList = function(index, pageSize, page, query) {

}

exports.handleCreate = async function (index, contact) {
    try {
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
        resp = {resp: 'Contact already exists', status: err.status}
        return resp;
    }
}

exports.handleDetail = async function(index, name) {
    try {
        const resp = await client.search({
            index: index,
            type: 'contact',
            q: 'name:' + name
        });
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
        let doc = {};
        if (contact.get('phoneNumber')) {
            doc.phoneNumber = contact.get('phoneNumber');
        }
        if (contact.get('email')) {
            doc.email = contact.get('email');
        }
        if (contact.get('address')) {
            doc.phoneNumber = contact.get('address');
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