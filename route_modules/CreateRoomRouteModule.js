
var RoomManager = require('RoomManager.js').RoomManager;
var TimestampHelper = require('TimestampHelper.js');
var deferred = require('deferred');

var CreateRoomRouteModule = {

	route: '/newroom',
	routeFunc: function(queries) {
		
		var def = deferred();

		//クエリが不完全な場合は失敗フラグで終了
		if (!(queries['rid'] && queries['name'] && queries['isGachi'])) {
			def.resolve(false);
			return def.promise;
		}

		var rid = queries['rid'];
		var name = queries['name'];
		var limit = !queries['limit'] ? null : queries['limit'];
		var now = TimestampHelper.getTimestamp();
		var isGachi = queries['isGachi'];
		RoomManager.createNewRoom(rid, name, limit, now, isGachi)

		.done(function(result) {
			def.resolve(result);
		}, 

		function(err) {
			def.resolve(false);
		});

		return def.promise;
	}
};

exports.CreateRoomRouteModule = CreateRoomRouteModule;