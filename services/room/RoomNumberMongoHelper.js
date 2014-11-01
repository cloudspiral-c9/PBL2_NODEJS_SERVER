
var MongoClient = require('mongodb').MongoClient;
var deferred = require('deferred');

var RoomNumberMongoHelper = {
	
	//MongoDBに接続が必要な処理をする処理をラップするメソッド
	_executeMongoUseFunc: function(executeFunc) {

		var def = deferred();

		MongoClient.connect('mongodb://localhost/recipeer', function(err, db) {

			//MongoDBに接続できない場合は例外を発生
			if (err) {
				throw err;
			}

			executeFunc(db, def);
		});

		return def.promise;
	},

	getCurrentRid: function() {

		var executeFunc = function(db, deferred) {

			var query = {'currentRoomNumber': {'$exists': true} };
			db.collection('RoomNumber').findOne(query, function(err, result) {

				db.close();

				if (err) {
					console.log(err);
					deferred.resolve(false);
				}

				deferred.resolve(result);
			});
		};

		var promise = this._executeMongoUseFunc(executeFunc);
		return promise;
	},

	upsertCurrentRid: function(rid) {

		var executeFunc = function(db, deferred) {

			rid = (rid == null) ? 1 : rid;

			var query = {'currentRoomNumber': {'$exists': true} };
			var updateQuery = {'$set': {'currentRoomNumber': rid}};
			db.collection('RoomNumber').update(query, updateQuery, {'upsert': true}, function(err, count, status) {
				
				db.close();

				if (err) {
					deferred.resolve(false);
				}

				deferred.resolve(true);

			});
		};

		var promise = this._executeMongoUseFunc(executeFunc);
		return promise;
	}

};

exports.RoomNumberMongoHelper = RoomNumberMongoHelper;
