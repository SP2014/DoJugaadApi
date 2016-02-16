var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Posts',{
	postType:String,
    title:String,
    description:String,
    category:String,
    problem:String,
    postUserId:String,
    timestamp: Date,
    image:Schema.Types.Mixed,
    media:Schema.Types.Mixed
});