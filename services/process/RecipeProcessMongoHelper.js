
var MongoUtil = require( __dirname + '/../util/MongoUtil.js');
var deferred = require('deferred');

var RecipeProcessMongoHelper = (function() {

	var insertRecipeProcess = function(rid, process, sender, index, now) {

		var executeFunc = function(db, deferred) {

			if (!(rid && process && sender)) {
				db.close();
				deferred.resolve(false);
			}

			var query = {'rid': rid, 'process': process, 'sender': sender, 'index': index, 'timestamp': now};
			db.collection('Process').insert(query, function(err, doc) {

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


	var getRecipeProcesses = function(rid) {

		var executeFunc = function(db, deferred) {

			if (!rid) {
				db.close();
				deferred.resolve(false);
				return;
			}

			var query = {'rid': rid};
			var cursor = db.collection('Process').find(query, {'sort': [ ['timestamp': 'desc'] ] });

			cursor.toArray(function(err, result) {

				db.close();
				
				if (err) {
					console.log(err);
					deferred.resolve(false);
					return;
				}

				deferred.resolve(JSON.stringify(result));
			});
		};

		var promise = MongoUtil.executeMongoUseFunc(executeFunc);
		return promise;
	};

	return {'insertRecipeProcess': insertRecipeProcess, 'getRecipeProcesses': getRecipeProcesses};

})();