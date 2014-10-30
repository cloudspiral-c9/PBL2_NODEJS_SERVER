
var assert = require('assert');
var ChatLogMongoHelper = require('../node_modules/ChatLogMongoHelper.js').ChatLogMongoHelper;
var TimestampHelper = require('../node_modules/TimestampHelper.js');
var MongoTestHelper = require('./MongoTestHelper.js').MongoTestHelper;

var now = TimestampHelper.getTimestamp();
MongoTestHelper.clearCollection('ChatLog').done(function(result) {

	ChatLogMongoHelper.insertMessage(3, 'test', 'mizuno', now)

	.done(function(result) {
	
		ChatLogMongoHelper.getChatLog(3)
		.done(function(result2) {

			var actual = JSON.parse(result2);
			delete actual._id;

			console.log(actual);

			var expected = [{rid: 3, message: 'test', sender: 'mizuno', timestamp: now}];
			assert.strictEqual(actual.rid, expected.rid);
			assert.strictEqual(actual.message, expected.message);
			assert.strictEqual(actual.sender, expected.sender);
			assert.strictEqual(actual.timestamp, expected.timestamp);
		}, 

		function(err) {
			throw err;
		});
	}, 

	function(err) {
		throw err;
	});


}, function(err) {});



//ChatLogMongoHelper.getChatLog(3,0,2)
//.done(function(result3) {
	
//	console.log(result3);

//});