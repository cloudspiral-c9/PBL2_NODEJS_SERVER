
var RoomMongoHelper = require('../node_modules/RoomMongoHelper.js').RoomMongoHelper;
var assert = require('assert');
var deferred = require('deferred');
var TimestampHelper = require('../node_modules/TimestampHelper.js');
var MongoTestHelper = require('./MongoTestHelper.js').MongoTestHelper;


var rid = 3;
var name = 'testRoom';
var limit = 2;
var now = TimestampHelper.getTimestamp();

var RoomTest = function() {

	MongoTestHelper.clearCollection('Room')

	.done(function(result) {

		RoomMongoHelper.insertRoom(rid, name, limit, 1, now)
		.done(function(result2) {

			RoomMongoHelper.getRoom(rid) 
			.done(function(actual){
				
				var expected = {'rid': rid, 'name': name, 'num': 1, 'limit': limit, 'timestamp': now};
				
				delete actual._id;
				console.log('after 1 Insert');
				console.log(actual);

				assert.deepEqual(actual, expected);

				RoomMongoHelper.updateMemberNum(rid, 2) 
				.done(function(result3) {

					RoomMongoHelper.getRoom(rid)
					.done(function(actual2) {
						
						var expected2 = {'rid': rid, 'name': name, 'num': 2, 'limit': limit, 'timestamp': now};
						
						delete actual2._id;
						console.log('after member set 2');
						console.log(actual2);

						assert.deepEqual(actual2, expected2);

						RoomMongoHelper.removeRoom(rid)
						.done(function(result4) {

							RoomMongoHelper.getRoom(rid)
							.done(function(actual3) {
								console.log('after removed');
								console.log(actual3);
								assert.strictEqual(actual3, null);
							});
						});

					},
					function(err) {});
				}, 
				function(err) {});
			},
			function(err) {});

		},
		function(err) {});
	},
	function(err) {});
};

RoomTest();
