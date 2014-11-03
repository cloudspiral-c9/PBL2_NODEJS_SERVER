
var RoomManager = require('RoomManager.js').RoomManager;
var deferred = require('deferred');

var AddMemeberRouteModule = {

	route: '/addmember',
	routeFunc: function(queries) {
		
		var def = deferred();

		//クエリが不完全な場合は失敗フラグで終了
		if (!(queries['rid'] && queries['userID']) ) {
			def.resolve(false);
			return def.promise;
		}

		var rid = queries['rid'];
		var userId = queries['userID'];
		RoomManager.addMember(rid, userId)

		.done(function(result) {
			def.resolve(result);
		}, 

		function(err) {
			def.resolve(false);
		});

		return def.promise;
	}
};

exports.AddMemberRouteModule = AddMemberRouteModule;