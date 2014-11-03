
var deferred = require('deferred');
var RoomManager = require( __dirname + '/../../services/login/RoomManager.js').RoomManager;
var IngredientMongoHelper = require( __dirname + '/../../services/ingredient/IngredientMongoHelper.js').IngredientMongoHelper;

var GetIngredientRouteModule = {
	
	route: '/getingredient',
	routeFunc: function(queries) {

		var def = deferred();

		if ( !(queries['rid'] && queries['userID']) ) {
			def.resolve(false);
			return def.promise;
		}

		var rid = queries['rid'];
		var userId = queries['userID'];

		RoomManager.isMemberOf(rid, userId)
		.done(function(isMember) {

			if (isMember) {

				IngredientMongoHelper.getIngredients(rid)
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

exports.GetIngredientRouteModule = GetIngredientRouteModule;
