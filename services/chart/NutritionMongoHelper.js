
var MongoUtil = require( __dirname + '/../util/MongoUtil.js');
var deferred = require('deferred');


var NutritionMongoHelper = (function() {

	//一食あたりの目安の栄養価を取得する
	var getIdealNutrition = function() {

		var executeFunc = function(db, deferred) {
			
			db.collection('idealNutrition').findOne({}, function(err, doc) {
				
				if (err) {
					db.close();
					console.log(err);
					deferred.resolve(false);
					return;
				}

				deferred.resolve(doc);
			});
		};

		var promise = MongoUtil.executeMongoUseFunc(executeFunc);
		return promise;
	};


	//ingredientに対応する栄養価を取得する
	var getNutrition = function(ingredientData) {

		var executeFunc = function(db, deferred) {

			if (!ingredientData.ingredient) {
				db.close();
				deferred.resolve(null);
				return;
			}
			
			var query = {'name': ingredientData.ingredient};
			db.collection('nutrition').findOne(query, function(err, doc) {

				db.close();

				if (err) {
					console.log(err);
					deferred.resolve(false);
					return;
				}

				delete doc._id;
				deferred.resolve(doc);
			});
		};

		var promise = MongoUtil.executeMongoUseFunc(executeFunc);
		return promise;
	};

	return {'getNutrition' : getNutrition, 'getIdealNutrition': getIdealNutrition};

})();

//外部モジュールにメソッドを公開
exports.NutritionMongoHelper = NutritionMongoHelper;
