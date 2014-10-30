

var RoomManager = require('RoomManager.js').RoomManager;
var deferred = require('deferred');

var ReduceMemberRouteModule = {
	
	route: '/reducemember',
	routeFunc: function(queries) {
		
		var def = deferred();

		//クエリが不完全な場合は失敗フラグで終了
		if (!queries['rid']) {
			def.resolve(false);
			return def.promise;
		}

		var rid = queries['rid'];
		RoomManager.reduceMember(rid)

		.done(function(result) {
			def.resolve(result);
		}, 

		function(err) {
			def.resolve(false);
		});

		return def.promise;
	}
};

exports.ReduceMemberRouteModule = ReduceMemberRouteModule;