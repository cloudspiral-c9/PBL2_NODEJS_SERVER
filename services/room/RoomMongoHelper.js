
var MongoClient = require('mongodb').MongoClient;
var deferred = require('deferred');


var RoomMongoHelper = {
	
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

	insertRoom: function(rid, name, limit, num, timestamp, isGachi) {

		var executeFunc = function(db, deferred) {

			var query = {'rid': rid, 'name': name, 'num': num, 'limit': limit, 'timestamp': timestamp, 'isGachi': isGachi};
			db.collection('Room').insert(query, function(err, doc) {

				db.close();

				if (err) {
					deferred.resolve(false);
				}

				deferred.resolve(true);
			});
		};

		var promise = this._executeMongoUseFunc(executeFunc);
		return promise;
	},

	removeRoom: function(rid) {

		var executeFunc = function(db, deferred) {

			var query = {'rid': rid};
			db.collection('Room').remove(query, function(err, result) {

				db.close();

				if (err) {
					deferred.resolve(false);
				}

				deferred.resolve(result);
			});
		}

		var promise = this._executeMongoUseFunc(executeFunc);
		return promise;
	},

	updateMemberNum: function(rid, num) {

		var executeFunc = function(db, deferred) {

			if (num < 0) {
				db.close();
				deferred.resolve(false);
			}

			var query = {'rid': rid};
			var updateQuery = {'$set': {'num': num}};

			db.collection('Room').update(query, updateQuery, function(err, count, status) {
				
				db.close();

				if (err) {
					deferred.resolve(false);
				}

				deferred.resolve(true);
			});
		}

		var promise = this._executeMongoUseFunc(executeFunc);
		return promise;
	},

	getRoom: function(rid) {

		var executeFunc = function(db, deferred) {

			var query = {'rid': rid};
			db.collection('Room').findOne(query, function(err, result) {
				
				db.close();

				if (err) {
					deferred.resolve(false);
				}

				deferred.resolve(result);
			});
		};

		var promise = this._executeMongoUseFunc(executeFunc);
		return promise;
	}
};

exports.RoomMongoHelper = RoomMongoHelper;