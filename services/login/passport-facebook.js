var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


var strategy = new FacebookStrategy( {
	clientID: '872737462758132',
	clientSecret: '8dadf69c34b34e5c2daf2b9447b46341',
	callbackURL: 
}, 

function(accessToken, refreshToken, profile, done) {
	
	console.log(profile);
});