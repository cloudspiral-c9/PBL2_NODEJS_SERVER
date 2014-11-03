
var RoomManager = require( __dirname + '/../../services/login/RoomManager.js' ).RoomManager;
var TimestampHelper = require( __dirname + '/../../services/util/TimestampHelper.js');
var deferred = require('deferred');

var CreateRoomRouteModule = {

	route: '/newroom',
	routeFunc: function(queries) {
		
		var def = deferred();

		//クエリが不完全な場合は失敗フラグで終了
		if (!(queries['rid'] && queries['description'] && queries['title'] && queries['userID'] && queries['type'] ) ){
			def.resolve(false);
			return def.promise;
		}

		var rid = queries['rid'];
		var description = queries['description'];
		var title = queries['title'];
		var userId = queries['userID'];
		var type = queries['type'];
		var limit = (!queries['limit']) ? 200 : queries['limit'];
		RoomManager.createNewRoom(rid, description, title, limit, userId, type)

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