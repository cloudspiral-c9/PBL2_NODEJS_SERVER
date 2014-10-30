

var RoomNumberMongoHelper = require( __dirname + '/../node_modules/RoomNumberMongoHelper.js').RoomNumberMongoHelper;
var assert = require('assert');
var deferred = require('deferred');
var MongoTestHelper = require(__dirname + '/MongoTestHelper.js').MongoTestHelper;

var RoomNumberTest = function() {

	MongoTestHelper.clearCollection('RoomNumber')
	.done(function(result) {

		RoomNumberMongoHelper.getCurrentRid()
		.done(function(rid) {

			console.log('first rid');
			console.log(rid);
			assert.strictEqual(rid, null);


			RoomNumberMongoHelper.upsertCurrentRid(rid)
			.done(function(result) {

				RoomNumberMongoHelper.getCurrentRid()
				.done(function(rid2) {

					var expected = 1;
					var actual = rid2.currentRoomNumber;

					console.log('after upsert');
					console.log(actual);

					assert.strictEqual(actual, expected);

					RoomNumberMongoHelper.upsertCurrentRid(4)
					.done(function(result) {

						RoomNumberMongoHelper.getCurrentRid()
						.done(function(rid3) {

							var expected = 4;
							var actual2 = rid3.currentRoomNumber;

							console.log('after upsert 4');
							console.log(actual2);

							assert.strictEqual(actual2, 4);

						}, function(err) {});

					}, function(err) {});

				}, function(err) {});

			}, function(err) {});

		}, function(err) {});

	}, function(err) {});
}

RoomNumberTest();