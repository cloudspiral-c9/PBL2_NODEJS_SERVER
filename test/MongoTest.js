
var MongoClient = require('mongodb').MongoClient;
var deferred = require('deferred');

MongoClient.connect('mongodb://localhost/recipeer', function(err, db) {
	db.close();
	db.collection('nutrition').find().toArray(function(err, doc) {
		if (err) {
			console.log(err);
		}
		console.log(doc);
	});
});