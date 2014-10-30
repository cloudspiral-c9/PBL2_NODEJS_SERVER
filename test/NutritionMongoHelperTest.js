
var NutritionMongoHelper = require('../node_modules/NutritionMongoHelper.js').NutritionMongoHelper;
var assert = require('assert');
var deferred = require('deferred');

var foodNameAmountMap = {'フランスパン': 100, 'うどん': 200};
var makeQueryTest = function() {


	var query = NutritionMongoHelper._makeQuery(foodNameAmountMap);

	var expected = {'$or':[{'name': 'フランスパン'}, {'name': 'うどん'}]};
	assert.deepEqual(query, expected);
};

makeQueryTest();


var getNutritionByFoodNamesTest = function() {

	var def = deferred();

	NutritionMongoHelper.getNutritionByFoodNames(foodNameAmountMap)
	.done(function(result) {
		console.log(result);
		def.resolve(result);
	},
	function(err) {

	});

	return def.promise;
};

getNutritionByFoodNamesTest();