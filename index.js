const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
});

client.indices.create({
    index: 'addressbook'
}, function (err, resp, status) {
    if (err) {
        console.log("create error", err);
    } else {
        console.log("create", resp);
    }
});

const addressBookRouter = require('./app/routes/addressBook');
app.use(addressBookRouter);


const server = require('http').createServer(app);
console.log('Server listening on port : ' + port);
server.listen(port);