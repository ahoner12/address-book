const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const addressBookRouter = require('./app/routes/addressBook');
app.use(addressBookRouter);

const server = require('http').createServer(app);
console.log('Server listening on port : ' + port);
server.listen(port);