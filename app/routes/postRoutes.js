/**
 *	This file defines the routes for mannipulating
 *	all kinds of posts that are kept in the database.
 */
var posts = require('../models/posts');		// Template for a post

/**
 * Fetching all the posts done till date.
 * header : NA
 * req.body : NA
 * res : array of all post objects
 */
exports.getAllPosts = function (req, res) {
	posts.find({}, function (err, posts) {
		res.json(posts);
	});
}

/*
 *	Get all the jugaad posts.
 *	header : NA
 *	req.body : NA
 *	res : Array of all jugaad posts
 */
exports.getAllJugaad = function (req, res) {
	posts.find({}, function (err, posts) {
		var resArray = [];
		for(entry in posts){
			if (posts[entry]['postType'] == 'jugaad') {
				resArray.push(posts[entry]);
			};
		}
		res.json(resArray);
	});	
}

/**
 *	Get all problems post
 *	header : NA
 *	req.body : NA
 *	res : Array of all problems posts
 */
exports.getAllProblems = function (req, res) {
	posts.find({}, function (err, posts) {
		var resArray = [];
		for(entry in posts){
			if (posts[entry]['postType'] == 'problem') {
				resArray.push(posts[entry]);
			};
		}
		res.json(resArray);
	});	
}

/**
 *	Get all the Products
 *	header : NA
 *	req.body : NA
 *	res : Array of all products
 */
exports.getAllIdeas = function (req, res) {
	posts.find({}, function (err, posts) {
		var resArray = [];
		for(entry in posts){
			if (posts[entry]['postType'] == 'idea') {
				resArray.push(posts[entry]);
			};
		}
		res.json(resArray);
	});	
}

/**
 *	Adding a new post
 *	header : access-token as 'x-access-token'
 *	req.body:
 *			posttype : type of post - jugaad, problem or product
 *			title : title of post as string
 *			description : description of post
 *			category : category to which it belongs - science, dailuy life etc
 *			problem : problem associated. This is not applicable for 'problem' type of posts
 *			postUserId : Id of user posting this post.
 *			timestamp : timestamp as seconds elapsed from epoch
 *			image : this is a mixed object type. It can have an image or an URL.
 *					Currently it is not supported.
 *			media : this is a mixed object type. It can have any media or URL.
 *					Currently it is not supported.
 *	res : success notifying json on success, error on error.
 */
exports.addPost = function (req, res) {
	var postob = new posts({
		postType:req.body.posttype,
		title:req.body.title,
		description:req.body.desc,
		category:req.body.cat,
		problem:req.body.prob,
		postUserId:req.body.userid,
		timestamp:req.body.timestamp,
		image:null,
		media:null
	});

	postob.save(function (err) {
		if (err) {
			throw err;
		}
		console.log('post saved successfully');
		res.json({success:true});
	});
}

exports.deletePost = function(req,res){
	var postId = req.params.id;
	posts.find({_id:postId}).remove().exec();
    console.log('Post Deleted');
}