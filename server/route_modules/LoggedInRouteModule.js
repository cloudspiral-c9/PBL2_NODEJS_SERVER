

var deferred = require('deferred');
var passport = require( __dirname + '/../../services/login/passport.js').passport;

var LoggedInRouteModule = {

	route: '/auth/google/return',
	request: null,
	response: null,
	routeFunc: function(queries) {

		var def = deferred();

		var redirects = {
			failureRedirect: '/'
		};

		console.log()
		passport.authenticate('google', redirects)(this.request, this.response);

		def.resolve(true);
		return def.promise;
	}
};

exports.LoggedInRouteModule = LoggedInRouteModule;