

var assert = require('assert');
var RoomManager = require('../node_modules/RoomManager.js').RoomManager;
var RoomMongoHelper = require('../node_modules/RoomMongoHelper.js').RoomMongoHelper;
var MongoTestHelper = require('./MongoTestHelper.js').MongoTestHelper;
var TimestampHelper = require('../node_modules/TimestampHelper.js');

var respondCurrentRidTest = function() {
	
	MongoTestHelper.clearCollection('RoomNumber')

	.done(function(result) {
		
		RoomManager.respondCurrentRid()
		.done(function(crid) {

			console.log('respond1');
			console.log(crid);

			assert.strictEqual(crid, 1);

			RoomManager.respondCurrentRid()
			.done(function(crid2) {
				
				console.log('respond2');
				console.log(crid2);

				assert.strictEqual(crid2, 2);
			});
		}, 
		function(err) {});
		
	},
	function(err) {});
};

respondCurrentRidTest();




var rid = 1;
var name = 'testRoom';
var limit = 2;
var now = TimestampHelper.getTimestamp();
var roomTest = function() {
	
	MongoTestHelper.clearCollection('Room')

	.done(function(result) {

		RoomManager.createNewRoom(rid, name, limit, now)
		.done(function(result) {

			console.log(result);
			RoomMongoHelper.getRoom(rid)
			.done(function(result2) {
			
				if (!result) {
					assert.strictEqual(result2, null);
				}

				var expected = {'rid': rid, 'name': name, 'num': 1, 'limit': limit, 'timestamp': now};
				delete result2._id;
				console.log(result2);

				assert.deepEqual(result2, expected);

				RoomManager.addMember(rid)
				.done(function(result3) {

					RoomMongoHelper.getRoom(rid)
					.done(function(result4) {

						var expected2 = {'rid': rid, 'name': name, 'num': 2, 'limit': limit, 'timestamp': now};
						delete result4._id;
						console.log('after add member1');
						console.log(result4);
						assert.deepEqual(result4, expected2);

						RoomManager.addMember(rid)
						.done(function(result5) {
							
							console.log('after add member2');
							console.log(result5);
							assert.strictEqual(result5, false);

							RoomMongoHelper.getRoom(rid)
							.done(function(result6) {

								console.log(result6);
								delete result6._id;
								assert.deepEqual(expected2, result6);

								RoomManager.reduceMember(rid)
								.done(function(result7) {
									
									console.log('after reduce member')
									console.log(result7);
									RoomMongoHelper.getRoom(rid)
									.done(function(result8) {
										delete result8._id;
										console.log(result8);
										assert.deepEqual(result8, expected);

									}, function(err){});

								}, function(err) {})

							}, function(err) {});

						}, function(err) {});

					}, function(err) {});
					
				}, function(err) {});

			}, function(err) { });
		},
		function(err) {});
	},
	function(err) {});
};

roomTest();