var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Users', new Schema({
	uname : String,
	password : String,
	email : String,
	fbid : String,
	googleid : String,
	isfbloggedin : Boolean,
	isgoogleloggedin : Boolean,
	timestamp: Date
}));