var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var emailRoutes = require('./app/routes/emailRoutes');
var postRoutes = require('./app/routes/postRoutes');
var userRoutes = require('./app/routes/userRoutes');


//var port = process.env.PORT || 1234;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
	url = process.env.OPENSHIFT_MONGODB_DB_URL +
		process.env.OPENSHIFT_APP_NAME;
}



mongoose.connect(url);

app.set('magicalSecret',config.secret);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/',function (req, res) {
	res.send("Hello! The api is at :"+port+"/api");
});

var apiRoutes = express.Router();

apiRoutes.get('/', function (req, res) {
	res.json('Welcome to DoJugaad webservices');
});


/**
 * These routes do not require user to be logged in
 */
apiRoutes.get('/emails', emailRoutes.getAllEmails);
apiRoutes.post('/addemail', emailRoutes.addEmail);
apiRoutes.post('/getemailwithsubstr', emailRoutes.getEmailWithSubstr);
apiRoutes.get('/emails/:email_id',emailRoutes.getByEmail);
apiRoutes.route('/emails/:email_id').delete(emailRoutes.deleteEmail);
apiRoutes.route('/emails/:email_id').put(emailRoutes.updateEmail);
apiRoutes.get('/posts', postRoutes.getAllPosts);
apiRoutes.get('/jugaad', postRoutes.getAllJugaad);
apiRoutes.get('/problems', postRoutes.getAllProblems);
apiRoutes.get('/ideas', postRoutes.getAllIdeas);
apiRoutes.get('/users', userRoutes.getAllUsers);

//apiRoutes.route('/emails/:email_id').get(emailRoutes.getByEmail);

/**
 * This is the route which will authenticate the user
 * and generate a token which will allow further 
 * communications
 */
apiRoutes.post('/authenticate',function (req, res) {
	var name = req.body.uname;
	var pwd = req.body.password;

	//TODO: Authenticate the uname and password

	var token = jwt.sign(name, app.get('magicalSecret'),{
		expiresInMinutes : 1440
	});

	res.json({
		success:true,
		message:"catch your token",
		token:token
	});

});


/**
 * Here we verify the token provided by user along with
 * the request
 */
apiRoutes.use(function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, app.get('magicalSecret'), function (err, decoded) {
			if (err) {
				res.json({success:false, message:'Failed to decode token'});
			}
			else{
				req.decoded = decoded;
				next();
			}
		});
	}
	else{
		return res.status(403).send({
			success:false,
			message:'No token provided'
		});
	}
});

/**
 * These routes require authentication.
 */
apiRoutes.post('/addpost',postRoutes.addPost);
apiRoutes.post('/adduser', userRoutes.addUser);



app.use('/api', apiRoutes);

//app.listen(port);
var server = require("http").Server(app);

server.listen(port, ipaddress);

console.log('Server running at '+ ipaddress + 'port:' + port);
//console.log("Listening to port 1234");