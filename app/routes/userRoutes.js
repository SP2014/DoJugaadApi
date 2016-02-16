/**
 * This file specifies the routes to handle
 * the information of all the users stored 
 * in the database.
 */
var users = require('../models/users');

/**
 * Fetching all the users logged in till date.
 * header : NA
 * req.body : NA
 * res : array of all post objects
 */
exports.getAllUsers = function (req, res) {
	users.find({}, function (err, users) {
		if(err) 
			throw err;
		res.send(users);
	});
}

/**
 *	Adding a new post
 *	header : access-token as 'x-access-token'
 *	req.body:
 *			uname : username as String
 *			password : password as 'STRING' 		TODO: Make it a hashed value
 *			email : user email as String
 *			fbid : facebook id of user as String
 *			googleid : google plus id of user as String
 *			isfblogedin : true if user's fb account is logged in. false otherwise
 *			isgoogleloggedin : true if user's google account is logged in. false otherwise
 *	res : success notifying json on success, error on error.
 */
exports.addUser = function (req, res) {
	var userob = new users({
		uname:req.body.uname,
		password:req.body.password,
		email:req.body.email,
		fbid:req.body.fbid,
		googleid:req.body.googleid,
		isfbloggedin:req.body.isfbloggedin,
		isgoogleloggedin:req.body.isgoogleloggedin
	});

	userob.save(function (err) {
		if (err) {
			throw err;
		}
		console.log('post saved successfully');
		res.json({success:true});
	});
}