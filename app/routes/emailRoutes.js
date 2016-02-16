/**
 *	This file defines the routes for manipulating the 
 *	email database that will be used by the autocomplete
 * 	functionality of mail send.
 */

var emails = require('../models/emails');	// Template for an email entry


/**
 *	Fetching all the email entries
 *	Header : NA
 *	req.body : NA
 *	res : json of all email objects
 */
exports.getAllEmails = function (req, res) {
	emails.find({}, function (err, emails) {
		res.json(emails);
	});
}

/**
 * Fetching a single record
 * Header : Email id
 * res: json of requested email
 */
exports.getByEmail = function(req,res){
    emails.find({'email':req.params.email_id},function(err, docs){
        if (err)
            res.send(err);
        res.json(docs);
    });
}

/**
 *	Get an email with a specific substring
 *	Header : NA
 *	req.body :
 *			substr : substring to be searched for
 *	res : json containing all the email objects matching
 *		  given substring
 */
exports.getEmailWithSubstr = function (req, res) {
    var substr = req.body.substr;
    emails.find({}, function (err, emails) {
        var resArray = [];
        for(entry in emails){
            var emailstr = emails[entry]['email'];
            if(emailstr.indexOf(substr) > -1){
                resArray.push({'email':emailstr});
            }
        }
        res.json(resArray);
    });

}

/**
 *	Add a new email to the list
 *	Header : NA
 *	req.body : 
 *			email : email to be inserted
 *	res : success notifying json on success. Error on error
 */
exports.addEmail = function (req, res) {
	var email = req.body.email;

	var emailob = new emails({
		email:email
	});

	emailob.save(function (err) {
		if(err){
			throw err;
		}
		console.log("Email saved successfully");
		res.json({success : true});
	})
}


/**
 * Delete the Requested email
 * Header: Email Id
 * res: success
 */

exports.deleteEmail = function(req,res){
    var emailId = req.params.email_id;
    emails.find({email:emailId}).remove().exec();
    res.json('Deleted');
}


/**
 * Update an email entry
 * Header: Emial Id
 * req.body: email
 * res: Update message
 */

exports.updateEmail = function(req,res){
    var emailId = req.params.email_id;
    var email = req.body.email;
    emails.find({email:emailId}, function (err, docs) {
      if(err)
       res.json(err);

       docs.email = email;
       docs.save(function(err){
           if (err)
               res.send(err);
           res.json({ message: 'mail updated!' });
       });
    })
}
