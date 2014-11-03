
var NutritionHelper = require( __dirname + '/../../services/chart/NutritionHelper.js').NuritionHelper;
var RoomManager = require( __dirname + '/../../services/login/RoomManager.js').RoomManager;
var deferred = require('deferred');

var GetNutritionRouteModule = {
	
	route: '/getnutrition',
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
				NutritionHelper.getNutritionDatas(rid)
				.done(function(nutritionDatas) {

					def.resolve(nutritionDatas);
				
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
		})

		return def.promise;
	}	
};

exports.GetNutritionRouteModule = GetNutritionRouteModule;
