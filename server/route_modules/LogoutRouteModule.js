
var LoginMongoHelper = require( __dirname + '/../../services/login/LoginMongoHelper.js').LoginMongoHelper;
var deferred = require('deferred');

var LogoutRouteModule = {
	
	route: '/logout',
	request: null,
	response: null,
	routeFunc: function(queries) {
		
		var def = deferred();

		if (!queries['userID']) {
			def.resolve(false);
			return def.promise;
		}

		var userId = queries['userID'];

		var that = this;
		LoginMongoHelper.removeLoginUserId(userId)
		.done(function(result) {
			that.request.session.destroy();
			that.response.redirect('http://ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com/recipeers/public/');
			def.resolve(result);
		}, function(err) {
			def.resolve(false);
		});

		return def.promise;
	}

};

exports.LogoutRouteModule = LogoutRouteModule;
