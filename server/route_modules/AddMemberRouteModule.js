
var RoomManager = require('RoomManager.js').RoomManager;
var LoginMongoHelper = require('LoginMongoHelper.js').LoginMongoHelper;
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
		
		LoginMongoHelper.isLoggedIn(userId)
		.done(function(isLoggedIn) {

			if (isLoggedIn) {
				
				RoomManager.addMember(rid, userId)

				.done(function(result) {
					def.resolve(result);
				}, 

				function(err) {
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

exports.AddMemberRouteModule = AddMemberRouteModule;
