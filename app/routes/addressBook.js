const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// Initialize Controllers
const contactController = require('../controllers/contactController');

// Contact Routes
// GET /contact?pageSize={}&page={}&query={}
router.get('/contact', contactController.contact_list);

// POST /contoct
router.post('/contact', contactController.contact_create);

// GET /contact/{name}
router.get('/users/:id', contactController.contact_detail);

// PUT /contact/{name}
router.put('/contact/:id', contactController.contact_update);

// DELETE /contact/{name}
router.delete('/contact/:id', contactController.contat_delete);

module.exports = router;