
var ServerHelper = require('ServerHelper.js').ServerHelper;
var SocketManager = require('SocketManager.js').SocketManager;

(function() {
	var server = ServerHelper.startServer();
	SocketManager.activateSocket(server);
})();


