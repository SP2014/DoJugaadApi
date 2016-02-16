module.exports = {
	'secret' : 'DostetDarum',
	'database' : process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/tempDJ'
}