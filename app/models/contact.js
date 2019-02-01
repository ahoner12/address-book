var schemas = require('./schemas');
var _ = require('lodash');

var Contact = function (data) {
    this.data = this.sanitize(data);
}

/* Use some lodash functions to make sure that only variables that are in schemas.js
   are used in data */
Contact.prototype.sanitize = function(data) {
    data = data || {};
    schema = schemas.contact;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

Contact.prototype.data = {}

Contact.prototype.get = function(name) {
    return this.data[name];
}

Contact.prototype.set = function(name, value) {
    this.data[name] = value;
}

module.exports = Contact;