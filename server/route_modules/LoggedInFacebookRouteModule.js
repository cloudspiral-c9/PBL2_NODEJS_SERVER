
var passport = require( __dirname + '/../../services/login/passport.js').passport;
var deferred = require('deferred');

var LoggedInFacebookRouteModule = {
	
	route: '/auth/facebook/callback',
	request: null,
	response: null,
	next: null,
	routeFunc: function(queries) {

		var def = deferred();


		var that = this;
		passport.authenticate('facebook', function(err, userObj) {

			if (err) {
				console.log(err);
				def.resolve(false);
				return;
			}

			that.request.logIn(userObj, function(err) {
				if(err) {
					console.log(err);
				}	
			});
			
			that.response.redirect('http://ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com:8080/views/login/roomselect');

		})(this.request, this.response, this.next);

		return def.promise;

	}

};

exports.LoggedInFacebookRouteModule = LoggedInFacebookRouteModule;