
var NutritionMongoHelper = require(__dirname + '/NutritionMongoHelper.js');
var deferred = require('deferred');

var NutritionHelper = (function() {

	//DBからidealNutritionとingredientDataに対応するnutiritonのデータを取得し，
	//栄養価の割合データを返す．
	var getNutritionRates = function(ingredientData) {

		var def = deferred();

		if (!ingredientData || !ingredientData.ingredient) {
			return;
		}

		var ingredient = ingredientData.ingredient;
		var retData = {'ingredient': ingredient, 'rates': []};

		//ratesのデータを作成する
		NutritionMongoHelper.getIdealNutrition()
		.done(function(idealNutrition) {

			NutritionMongoHelper.getNutrition(ingredientData)
			.done(function(nutrition) {

				var rates = new Object();
				Object.keys(nutrition).forEach(function(nutritionName) {

					//idealNutritionにあるものだけを算出する
					if (!idealNutrition[nutritionName]) {
						return;
					}

					var rate = nutrition[nutritionName] / idealNutrition[nutritionName];
					rates[nutritionName] = rate;
				});

				retData.rates = rates;
				def.resolve(retData);

			}, function(err) {
				console.log(err);
				def.resolve(retData);
			});

		}, function(err) {
			console.log(err);
			def.resolve(retData);
		});

		return def.promise;
	}
	
	return {'getNutritionRates': getNutritionRates};

})();

exports.NutritionHelper = NutritionHelper;

