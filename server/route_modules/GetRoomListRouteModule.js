
var RoomManager = require(__dirname + '/../../services/login/RoomManager.js').RoomManager;
var LoginMongoHelper = require( __dirname + '/../../services/login/LoginMongoHelper.js').LoginMongoHelper;
var deferred = require('deferred');

var GetRoomListRouteModule  = {

	route: '/getroomlist',
	routeFunc: function(queries) {

		var def = deferred();

		if (!(queries['userID'] && queries['type'])) {
			def.resolve(false);
			return def.promise;
		}

		var userID = queries['userID'];
		var type = queries['type'];

		LoginMongoHelper.isLoggedIn(userID)
		.done(function(isLoggedIn) {

			if (isLoggedIn) {

				RoomManager.getRoomListByType(type)
				.done(function(roomList) {

					def.resolve(roomList);

				}, function(err) {
					console.log(err);
					def.resolve(false);
				});

			} else {
				def.resolve(false);
			}
			

		}, function(err) {
			console.log(err);
			def.resolve(false);
		});

		return def.promise;
	}
};

exports.GetRoomListRouteModule = GetRoomListRouteModule;