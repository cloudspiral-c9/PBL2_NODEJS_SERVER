
var ChatLogMongHelper = require('ChatLogMongoHelper.js');
var TimestampHelper = require('TimestampHelper.js');

var ChatEventModule = {
	
	ns: '/chat',
	io: null,
	socket: null,

	eventHandlerMap: {
		
		enterRoom: function(data, resFunc) {
			
			if (!data.rid) {
				resFunc(false);
				return;
			}

			var that = this;
			ChatLogMongoHelper.getChatLog(data.rid, 0, 50)
			.done(function(result) {
				that.socket.join(data.rid);
				resFunc(result);
			},

			function(err) {
				resFunc(false);
			});
		},

		leaveRoom: function(data, resFunc) {
			this.socket.close();
		},

		sendMessage: function(data, resFunc) {
			
			if (!(data.rid && data.message && data.sender)) {
				resFunc(false);
				return;
			}

			var now = TimestampHelper.getTimestamp();
			ChatLogMongoHelper.insertMessage(data.rid, data.message, data.sender, now)
			
			.done(function(isSucceed) {
				if (isSucceed) {
					var resObject = {'message': data.message, 'sender': data.sender, 'timestamp': now};
					this.io.to(data.rid).emit('broadcastSendMessage', resObject, function(data) {});
				}
			},

			function(err) {

			});

		},

		loadChatLog: function(data, resFunc) {

			if (!(data.rid && data.pos && data.num)) {
				resFunc(false);
				return;
			}

			ChatLogMongoHelper.getChatLog(data.rid, data.pos, data.num)
			.done(function(result) {
				resFunc(result);
			}, 

			function(err) {
				resFunc(err);
			})

		}
	}
};

exports.ChatEventModule = ChatEventModule;