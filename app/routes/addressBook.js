const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// Initialize Controllers
const contactRequests = require('./contactRequests');

// Contact Routes
// GET /contact?pageSize={}&page={}&query={}
router.get('/contact', contactRequests.contact_list);

// POST /contoct
router.post('/contact', contactRequests.contact_create);

// GET /contact/{name}
router.get('/contact/:id', contactRequests.contact_detail);

// PUT /contact/{name}
router.put('/contact/:id', contactRequests.contact_update);

// DELETE /contact/{name}
router.delete('/contact/:id', contactRequests.contact_delete);

module.exports = router;