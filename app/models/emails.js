var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Emails', new Schema({
	email: String
}));