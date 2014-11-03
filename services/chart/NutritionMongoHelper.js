
var MongoUtil = require( __dirname + '/../util/MongoUtil.js');
var IngredientMongoHelper = require( __dirname + '/../ingredient/')
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

				delete doc._id;
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


	//ingredientDataの配列からorクエリを作成する
	var _makeOrQuery = function(ingredientDatas) {
		
		var orArray = new Array();
		for (var i = 0; i < ingredientDatas.length; i++) {
			orArray.push({'ingredient': ingredientData[i].ingredient});
		}

		var query = {'$or': orArray};
		return query;
	}


	//ridに対応する部屋のnutritionをかえす．
	var getNutritionsByRid = function(rid) {

		var executeFunction = function(db, deferred) {

			if (!rid) {
				db.close();
				deferred.resolve(false);
				return;
			}

			IngredientMongoHelper.getIngredients(rid)
			.done(function(ingredientDatas) {

				var query = _makeOrQuery(ingredientDatas);
				var cursor = db.collection('nutrition').find(query);

				cursor.toArray(function(err, result) {

					db.close();

					if (err) {
						console.log(err);
						deferred.resolve(false);
						return;
					}

					deferred.resolve(result);
				});

			}, function(err) {
				console.log(err);
				deferred.resolve(false);
			});
		};

		var promise = MongoUtil.executeMongoUseFunc(executeFunction);
		return promise;

	};



	return {'getNutrition' : getNutrition, 'getIdealNutrition': getIdealNutrition, 'getNutrtionsByRid': getNutritionsByRid};

})();

//外部モジュールにメソッドを公開
exports.NutritionMongoHelper = NutritionMongoHelper;
