

var MongoUtil = require( __dirname + '/../MongoUtil.js');
var deferred = require('deferred');

var IngredientMongoHelper = (function(){
	
	var insertIngredient = function(rid, ingredient, amount, sender) {

		var executeFunc = function(db, deferred) {

			if (!(rid && ingredient && amount && sender)) {
				db.close();
				deferred.resolve(false);
			}

			var query = {'rid': rid, 'ingredient': ingredient, 'amount': amount, 'sender': sender};
			db.collection('Ingredient').insert(query, function(err, doc) {

				db.close();

				if (err) {
					console.log(err);
					deferred.resolve(false);
					return;
				}

				deferred.resolve(true);
			});

		};

		var promise = MongoUtil.executeMongoUseFunc(executeFunc);
		return promise;
	};


	var getIngredients = function(rid) {

		var executeFunc = function(db, deferred) {

			if (!rid) {
				db.close();
				deferred.resolve(false);
				return;
			}

			var query = {'rid': rid};
			var cursor = db.collection('Ingredient').find(query);

			cursor.toArray(function(err, result) {

				db.close();
				
				if (err) {
					console.log(err);
					deferred.resolve(false);
					return;
				}

				deferred.resolve(true);
			});
		};

		var promise = MongoUtil.executeMongoUseFunc(executeFunc);
		return promise;
	};
	
	return {'insertIngredient': insertIngredient, 'getIngredients': getIngredients};

})();

exports.IngredientMongoHelper = IngredientMongoHelper;