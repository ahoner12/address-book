const assert = require('assert');

const Contact = require('../app/models/contact');

const contactController = require('../app/controllers/contactController');

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
});

const contact1 = new Contact({
    name: 'Scott',
    phoneNumber: '1231231234',
    email: 'aoeu',
    address: 'smile'
});
const contact2 = new Contact({
    name: 'Scott',
    phoneNumber: '2342342345',
    email: 'aaoeuaoeu',
    address: 'smiu'
});
const contact3 = new Contact({
    name: 'Tom',
    phoneNumber: '1231231234',
    email: 'aoeu',
    address: 'smile'
});
const contact4 = new Contact({
    name: 'Daisy',
    phoneNumber: '123',
    email: 'daisy',
    address: 'pupper'
});


describe('Contact', function() {
    describe('#handleList()', function() {
        it('should provide a listing of all contacts. Listing changed by page size, page number, and a query', function() {

        });
    });

    describe('#handleCreate()', function() {
        before(async () => {
            try {
                await client.indices.create({
                    index: 'test'
                });
                console.log('create index');
            } catch(err) {}
        });

        it('should create a contact if the name is unique.', async () => {
            try {
                await contactController.handleCreate('test', contact1);
                await contactController.handleCreate('test', contact2);
                await contactController.handleCreate('test', contact3);
                /* This timeout appears several times throughout the tests
                it seems elasticSearch has a short delay for requests to actually update */
                await new Promise(resolve => setTimeout(resolve, 1000));
                count = await client.count({
                    index: 'test'
                });
            } catch(err) {
                console.log(err);
            }
            assert.equal(count.count, 2);
        });

        after(async () => {
            try {
                await client.delete({
                    index: 'test'
                });
                console.log('delete index');
            } catch(err) {}
        });
    });

    describe('#handleDetail()', function() {
        before(async () => {
            try {
                await client.indices.create({
                    index: 'test'
                });
                console.log('create index');
            } catch(err) {}
        });

        it('should return a contact by a unique name.', async() => {
            await contactController.handleCreate('test', contact1);
            await contactController.handleCreate('test', contact2);
            await contactController.handleCreate('test', contact3);
            await new Promise(resolve => setTimeout(resolve, 1000));
            let resp = await contactController.handleDetail('test', 'Scott')
            assert.equal(resp.resp.name, 'Scott');
            assert.equal(resp.status, 200);
            resp = await contactController.handleDetail('test', 'Tom')
            assert.equal(resp.resp.name, 'Tom');
            assert.equal(resp.status, 200);
            resp = await contactController.handleDetail('test', 'scottt')
            assert.equal(resp.status, 404);
        });

        after(async () => {
            try {
                await client.delete({
                    index: 'test'
                });
                console.log('delete index');
            } catch(err) {}
        });
    });

    describe('#handleUpdate()', function() {
        before(async () => {
            try {
                await client.indices.create({
                    index: 'test'
                });
                console.log('create index');
            } catch(err) {}
        });

        it('should update the contact by a unique name. Should error if not found.', async () => {
            await contactController.handleCreate('test', contact1);
            await contactController.handleCreate('test', contact2);
            await contactController.handleCreate('test', contact3);
            await contactController.handleUpdate('test', 'Scott', contact2);
            await new Promise(resolve => setTimeout(resolve, 1000));
            let resp = await contactController.handleDetail('test', 'Scott')
            assert.equal(resp.resp.phoneNumber, '2342342345');
            resp = await contactController.handleUpdate('test', 'Daisy', contact2);
            assert.equal(resp.status, 404);
        });

        after(async () => {
            try {
                await client.delete({
                    index: 'test'
                });
                console.log('delete index');
            } catch(err) {}
        });
    });

    describe('#handleDelete()', function() {
        before(async () => {
            try {
                await client.indices.create({
                    index: 'test'
                });
                console.log('create index');
            } catch(err) {}
        });

        it('should delete the contact by a unique name. Should error if not found', async () => {
            await contactController.handleCreate('test', contact1);
            let resp = await contactController.handleDelete('test', 'Scott');
            await new Promise(resolve => setTimeout(resolve, 1000));
            assert.equal(resp.status, 200);
            resp = await contactController.handleDetail('test', 'Scott')
            assert.equal(resp.status, 404);
        });
    });
});