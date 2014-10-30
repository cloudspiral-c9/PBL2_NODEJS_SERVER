
var NutritionMongoHelper = require('NutritionMongoHelper.js');
var IngredientMongoHelper = require('IngredientMongoHelper.js');
var RoomManager = require('RoomManager.js');
var deferred = require('deferred');

var NutritionEventModule = {
	
	ns: '/nutrition',
	io: null,
	socket: null,

	eventHandlerMap: {
		
		enterRoom: function(data, resFunc) {
			
			if (!data.rid) {
				resFunc(false);
			}	
				
			var that = this;	
			IngredientMongoHelper.getIngredients(rid)
				
			.done(function(ingredients) {
				that.socket.join(rid);
				resFunc(ingredients);
			}, 
			
			function(err) {
				resFunc(false);
			});
		}, 

		leaveRoom: function(data, resFunc) {

			if (!data.rid) {
				resFunc(false);
				return;
			}

			this.socket.close();
		},
		

		addIngredients: function(data, resFunc) {
		
			if (!(data.rid && data.foodNameAmountMap && data.sender)) {
				resFunc(false);
				return;
			}

			IngredientMongoHelper.insertIngredients(data.rid, data.foodNameAmountMap, data.sender)
			.done(function(result) {
				
				if (!result) {
					resFunc(false);
					return;
				}

				NutritionMongoHelper.getNutritionByFoodNames(data.foodNames)
				.done(function(nutrition) {
					
					if (!nutritions) {
						resFunc(null);
						return;
					}

					var now = new Date().toString();
					var resObject = {'nutrition': nutrition, 'ingredients': data.foodNameAmountMap, 'sender': sender, 'timestamp': now};
					this.io.to(data.rid).emit('broadcastAddFood', resObject, function(data) {});
					resFunc(true);
				}, 

				function(err) {
					resFunc(false);
				});

			},

			function(err) {
				resFunc(false);
			});

		}
	}
};

exports.NutritionEventModule = NutritionEventModule;