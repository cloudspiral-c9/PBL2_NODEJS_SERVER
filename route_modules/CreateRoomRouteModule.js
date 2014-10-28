
var RoomManager = require('RoomManager.js').RoomManager;
var deferred = require('deferred');

var CreateRoomRouteModule = {

	route: '/newroom',
	routeFunc: function(queries) {
		
		var def = derferred();

		//クエリが不完全な場合は失敗フラグで終了
		if (!(queries['rid'] && queries['name'], queries['limit'])) {
			def.resolve(false);
		}

		var rid = queries['rid'];
		var name = queries['name'];
		var limit = queries['limit'];
		RoomManager.createNewRoom(rid, name, limit)

		.done(function(result) {
			def.resolve(result);
		}, 

		function(err) {
			def.resolve(false);
		});

		return def.promise;
	}
};

exports = CreateRoomRouteModule;