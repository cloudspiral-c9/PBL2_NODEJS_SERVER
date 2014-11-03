
var passport = require('passport');
var GoogleStrategy = require('passport-google').strategy;
var LoginMongoHelper = require( __dirname + 'LoginMongoHelper.js' );


var baseURL = 'http://ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com';

var strategy = new GoogleStrategy( {'returnURL': baseURL + '/auth/google/return', 'realm': baseURL + '/recipeers/public'} );
passport.use(strategy, function(identifier, profile, done) {

	LoginMongoHelper.insertLoginUserId(identifier)
	.done(function(result) {
		done(null, {'userID': identifier});
	}, function(err) {
		done(err, null);
	});

});

exports.passport = passport;
