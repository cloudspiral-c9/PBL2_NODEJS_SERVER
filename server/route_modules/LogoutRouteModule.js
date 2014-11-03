
var LoginMongoHelper = require( __dirname + '/../../services/login/LoginMongoHelper.js').LoginMongoHelper;
var deferred = require('deferred');

var LogoutRouteModule = {
	
	route: '/logout',
	routeFunc: function(queries) {
		
		var def = deferred();

		if (queries.id) {

			LoginMongoHelper.removeLoginUserId(id)
			.done(function(result) {
				def.resolve(result);
			}, function(err) {
				def.resolve(false);
			});

		}

		return def.promise;
	}

};

exports.LogoutRouteModule = LogoutRouteModule;
