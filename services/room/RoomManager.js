
var RoomMongoHelper = require( __dirname + '/RoomMongoHelper.js').RoomMongoHelper;
var RoomNumberMongoHelper = require( __dirname + '/RoomNumberMongoHelper.js').RoomNumberMongoHelper;
var TimestampHelper = require( __dirname + '/TimestampHelper.js');
var deferred = require('deferred');

var RoomManager = {

	//現在のRidを返し，DB内のridのカウントを1インクリメントする
	//DB内に存在しなければridを1として新たに作成しDBに登録する．
	respondCurrentRid: function() {

		var def = deferred();

		RoomNumberMongoHelper.getCurrentRid()
		.done(function(cRoomNumber) {

			var rid = (cRoomNumber === null) ? 0 : cRoomNumber.currentRoomNumber;
			
			RoomNumberMongoHelper.upsertCurrentRid(++rid)
			.done(function(isSucceed) {

				if (!isSucceed) {
					def.resolve(false);
				}

				def.resolve(rid);

			}, function(err) {

				def.resolve(false);

			});

		}, function(err) {

			def.resolve(false);

		});

		return def.promise;
		
	},

	//rid, name, limitを指定して新しい部屋を作成する．
	//nameはレシピ名, limitは部屋の定員
	//成功した場合はtrueを返す
	createNewRoom: function(rid, name, limit, now, isGachi) {

		var def = deferred();

		if (!(rid && name && isGachi)) {
			def.resolve(false);
		}

		if (!limit) {
			limit = 200;
		}

		RoomMongoHelper.insertRoom(rid, name, limit, 1, now, isGachi)
		.done(function(result) {

			if (!result) {
				def.resolve(false);
			}

			def.resolve(true);
		}, 

		function(err) {

			def.resolve(false);
		});

		return def.promise;
	},

	//指定したridを持つ部屋の人数を一人増やす
	//定員オーバーやDBエラーの場合はfalseを返す
	addMember: function(rid) {

		var def = deferred();
		if (!rid) {
			def.resolve(false);
		}

		RoomMongoHelper.getRoom(rid)
		.done(function(room) {
			
			if (!room) {
				def.resolve(false);
				return;
			}

			var num = room.num + 1;
			var limit = room.limit;

			if (limit < num) {
				def.resolve(false);
			} else {
				
				RoomMongoHelper.updateMemberNum(rid, num)
				.done(function(result) {
					
					if (!result) {
						def.resolve(false);
						return;
					}

					def.resolve(true);
				},

				function(err) {
					def.promise(false);
				});
			}	
		}, 

		function(err) {
			def.resolve(false);
		});

		return def.promise;
	},



	//退室時に部屋の人数をマイナス1する
	reduceMember: function(rid) {

		var def = deferred();
		if (!rid) {
			def.resolve(false);
		}

		RoomMongoHelper.getRoom(rid)
		.done(function(room) {
			
			if (!room) {
				def.resolve(false);
			}

			var num = room.num - 1;
			if (num < 0) {
				def.resolve(true);
			}

			RoomMongoHelper.updateMemberNum(rid, num)
			.done(function(result) {
				
				if (!result) {
					def.resolve(false);
				}

				def.resolve(true);
			},

			function(err) {
				def.promise(false);
			});
		}, 

		function(err) {
			def.resolve(false);
		});


		return def.promise;
	},

	//ridで指定した部屋を削除する
	removeRoom: function(rid) {

		var def = deferred();
		if (!rid) {
			def.resolve(false);
		}

		RoomManager.removeRoom(rid)
		.done(function(result) {
			def.resolve(result);
		}, 

		function(err) {
			def.resolve(false);
		});

		return def.promise;
	}

};

exports.RoomManager = RoomManager;
