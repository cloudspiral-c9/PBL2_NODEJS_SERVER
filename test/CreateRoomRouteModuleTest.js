
var assert = require('assert');
var CreateRoomRouteModule = require('../route_modules/CreateRoomRouteModule.js').CreateRoomRouteModule;
var RoomMongoHelper = require('../node_modules/RoomMongoHelper.js').RoomMongoHelper;
var MongoTestHelper = require('./MongoTestHelper.js').MongoTestHelper;

var routeFuncTest = function() {

	MongoTestHelper.clearCollection('Room')
	.done(function(result) {


		CreateRoomRouteModule.routeFunc({rid: 1, name: 'mizuno'})
		.done(function(result1) {

			console.log('result1');
			console.log(result1);
			assert.strictEqual(result1, false);

			var queries1 = {'rid': 1, 'name': 'testRoom', 'limit': 2};
			CreateRoomRouteModule.routeFunc(queries1)
			.done(function(result2) {
				
				console.log('result2');
				console.log(result2);
				assert.strictEqual(result2, true);

				RoomMongoHelper.getRoom(1)
				.done(function(result3) {
					console.log('result3');
					delete result3._id;
					console.log(result3);
					var expected = {'rid': 1, 'name': 'testRoom', 'limit': 2, 'num': 1};
					assert.strictEqual(result3.rid, expected.rid);
					assert.strictEqual(result3.name, expected.name);
					assert.strictEqual(result3.limit, expected.limit);
					assert.strictEqual(result3.num, expected.num);
				});


			}, function(err) {});

		}, function(err) {});

	}, function(err) {});
}

routeFuncTest();