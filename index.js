const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const config = require('./config.json');

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: config.host + ":" + config.port
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