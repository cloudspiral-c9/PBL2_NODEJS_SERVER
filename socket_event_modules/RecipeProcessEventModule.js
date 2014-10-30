
var RecipeProcessMongoHelper = require('RecipeProcessMongoHelper.js');

var RecipeProcessEventModule = {
	
	ns: '/process',
	io: null,
	socket: null,

	eventHandlerMap: {
		
		enterRoom: function(data, resFunc) {

			if (!data.rid) {
				resFunc(false);
				return;
			}	
			
			var that = this;
			RecipeProcessMongoHelper.getRecipeProcesses(data.rid)
			.done(function(result) {
				that.socket.join(data.rid);
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

			this.socket.close();
		},

		addProcess: function(data, resFunc) {

			if (!(data.rid && data.process && data.sender)) {
				resFunc(false);
				return;
			}

			var now = new Date().toString();
			RecipeProcessMongoHelper.insertRecipeProcess(data.rid, data.process, data.sender, data.processSequence, now)
			
			.done(function(isSucceed) {
				
				if (isSucceed) {
					var resObject = {'process': data.process, 'sender': data.sender, 'timestamp': now};
					if (data.processSequence) {
						resObject.processSequence = data.processSequence;
					}
					this.io.to(data.rid).emit('broadcastAddProcess', resObject, function(data) {});
					resFunc(true);
				} else {
					resFunc(false);
				}
			},

			function(err) {
				resFunc(false);
			});
		}
	}
};

exports.RecipeProcessEventModule = RecipeProcessEventModule;