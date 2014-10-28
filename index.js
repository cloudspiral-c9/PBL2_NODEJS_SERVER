
var ServerHelper = require('ServerHelper.js');
var SocketManager = require('SocketManager.js');

(function() {
	var server = ServerHelper.startServer();
	SocketManager.activateSocket(server);
})();


