
var passport = require( __dirname + '/../../services/login/passport.js').passport;

var LoginRouteModule = {

	route: '/auth/google',
	request: null,
	response: null,
	routeFunc: function(queries) {
		passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] })(this.request, this.response);
		console.log('authenticate');
	}
};

exports.LoginRouteModule = LoginRouteModule;