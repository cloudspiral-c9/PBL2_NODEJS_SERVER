

var assert = require('assert');
var IngredientMongoHelper = require( __dirname + '/../node_modules/IngredientMongoHelper.js').IngredientMongoHelper;
var MongoTestHelper = require( __dirname + '/MongoTestHelper.js').MongoTestHelper;

var foodNameAmountMap = {'フランスパン': 100, 'うどん': 200};
var rid = 3;
var sender = 'mizuno';
var expected = [{'rid': rid, 'sender': sender, 'ingredient': 'フランスパン', 'amount': 100}, {'rid': rid, 'sender': sender, 'ingredient': 'うどん', 'amount': 200}];

var makeInsertQueryTest = function() {
	var actual = IngredientMongoHelper._makeInsertQuery(rid, foodNameAmountMap, sender);
	console.log('insert Query');
	console.log(actual);
	assert.deepEqual(actual, expected);
};

makeInsertQueryTest();

var getIngredientTest = function() {

	MongoTestHelper.clearCollection('Ingredient')

	.done(function(result) {

		IngredientMongoHelper.insertIngredients(3, foodNameAmountMap, 'mizuno')

		.done(function(result) {

			IngredientMongoHelper.getIngredients(3)
			.done(function(result) {

				var actual = JSON.parse(result);
				delete actual[0]._id;
				delete actual[1]._id;
				console.log('getIngredient');
				console.log(actual);
				assert.deepEqual(actual, expected);
			}, 
			function(err) {

			});
		})
	},

	function(err) {});
}

getIngredientTest();


