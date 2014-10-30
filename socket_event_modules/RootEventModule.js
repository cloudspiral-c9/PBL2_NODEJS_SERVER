
var RoomManager = require('RoomManager.js');

var RootEventModule = {
	
	ns: '/',
	io: null,
	socket: null,


	eventHandlerMap: {

		enterRoom: function(data, resFunc) {
		
			if (!data.rid) {
				resFunc(false);
				return;
			} 

			RoomManager.addMember(data.rid)
			
			//セキュリティとかをちゃんとするならresultに暗号的な情報を入れて返すようにしていこうのアクセスをそれで制御するようにする．
			//socket.set()とかをうまくつかって
			.done(function(result) {
				resFunc(result);
			},

			function(err) {
				resFunc(false);
			});
		},

		leaveRoom: function(data, resFunc) {

			if (!data.rid) {
				resFunc(false);
				return;
			}

			RoomManager.reduceMember(data.rid)
			.done(function(isSucceed) {
				resFunc(true);
				return;
			}, 
			
			function(err) {
				resFunc(true);
			});
		}
	}
	
};

exports.RootEventModule = RootEventModule;
