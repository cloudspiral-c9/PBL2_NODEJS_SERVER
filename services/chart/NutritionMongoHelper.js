
var MongoUtil = require( __dirname + '/../util/MongoUtil.js');
var deferred = require('deferred');


var NutritionMongoHelper = (function() {

	var getNutritionByFoodNames = function(foodNameAmountMap) {

		var that = this;
		var executeFunc = function(db, def) {

			if ()
		}
	}

	return {'getNutritionByFoodNames' : getNutritionByFoodNames};

})();

//外部モジュールにメソッドを公開
exports.NutritionMongoHelper = NutritionMongoHelper;


/////////////////////////////////////////////////////////////
TODO　要修正 データの形式

	getNutritionByFoodNames: function(foodNameAmountMap) {

		var that = this;

		var executeFunc = function(db, def){
			
			if (!foodNameAmountMap) {
				def.resolve(false);
			}

			var query = that._makeQuery(foodNameAmountMap);
			
			var collection = db.collection('nutrition');
			var cursor = collection.find(query);

			var result = new Array();
			cursor.each(function(err, doc) {
				
				if (err) {
					console.log(err);
				}

				if (doc == null) {
					db.close();
					var jsonResult = JSON.stringify(result);
					def.resolve(jsonResult);
				} else {
					var retDoc = that._calcNutritions(foodNameAmountMap, doc);
					result.push(retDoc);
				}

			});
		};

		var promise = this._executeMongoUseFunc(executeFunc);
		return promise;
	},

	_makeQuery: function(foodNameAmountMap) {
		
		var orArray = new Array();
		Object.keys(foodNameAmountMap).forEach(function(foodName) {
			orArray.push({'name': foodName});
		});
		var query = {'$or': orArray};
		return query;
	},

	//Amountを考慮し栄養価を計算した後のMapを返す
	_calcNutritions: function(foodNameAmountMap, doc) {
		
		var retDoc = new Object();
		retDoc.name = doc.name;
		Object.keys(doc).forEach(function(nutritionName) {
			if (nutritionName !== 'name') {
				retDoc[nutritionName] = doc[nutritionName] * foodNameAmountMap[retDoc.name];
			}
		});

		return retDoc;
	}

}

