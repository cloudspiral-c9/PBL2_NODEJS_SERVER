
var ChatLogMongoHelper = require( __dirname + '/../../services/chat/ChatLogMongoHelper.js').ChatLogMongoHelper;
var RoomManager = require( __dirname + '/../../services/login/RoomManager.js').RoomManager;
var deferred = require('deferred');

var GetChatLogRouteModule = {

	route: '/getChatLog',
	routeFunc: function(queries) {

		var def = deferred();

		if (! (queries['rid'] && queries['userID']) ) {
			def.resolve(false);
			return def.promise;
		}

		var rid = queries['rid'];
		var pos = !queries['pos'] ? null: pos;
		var limit = !queries['limit'] ? null : limit;
		var userId = queries['userID'];

		RoomManager.isMemberOf(rid, userId)
		.done(function(isMember) {

			if (isMember) {

				ChatLogMongoHelper.getChatLog(rid, pos, limit)
				.done(function(result) {
					def.resolve(result);
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

exports.GetChatLogRouteModule = GetChatLogRouteModule;
