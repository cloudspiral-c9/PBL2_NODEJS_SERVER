
var http = require('http');
var url = require('url');
var fs = require('fs');


var ServerHelper = {

	server: null,
	
	startServer: function() {
		this._loadRouteModules();
		this._createServer();
		this._registerRequestHandler();
		this._listen();
		return this.server;
	},
	
	_routeFuncMap: new Object(),
	
	_createServer: function() {
		this.server = http.createServer();
		console.log("Server Create");
	},

	_registerRequestHandler: function() {

		if (!this.server) {
			throw "Server Error";
		}

		var that = this;
		this.server.on('request', function(request, response) {
			
			if (request.method != 'GET') {
				return;
			}
	
			var parsedObject = url.parse(request.url, true);
			var path = parsedObject.pathname;
			var queries = parsedObject.query;

			if (that._routeFuncMap[path]) {
				that._routeFuncMap[path](queries)

				.done(function(result) {
					that._respondResult(response, result);
				}, 

				function(err) {
					console.log(err);
				});
			}
		});
	},

	_listen: function() {
		var port = 8080;
		this.server.listen(port, function() {
			console.log("Start Server Listen");
		});
	},

	_loadRouteModules: function() {

		var readPath = __dirname + '/../route_modules';
		var fileNames = fs.readdirSync(readPath);		
		var moduleFileNames = fileNames.filter(function(fileName) {
			return fs.statSync(readPath + '/' + fileName).isFile() && /.js$/.test(fileName);
		});;

		var that = this;
		moduleFileNames.forEach(function(moduleName) {
			var routeModule = require(readPath + '/' + moduleName)[moduleName.slice(0, -3)];
			that._addRouteModule(routeModule); 
		});
	},

	_addRouteModule: function(module) {
		if (this._routeFuncMap[module.route]) {
			throw 'Already Exist ' + module.route;
		}
		this._routeFuncMap[module.route] = module.routeFunc;	
	},

	//レスポンスを返すためのメソッド
	_respondResult: function(response, result) {
		
		//レスポンスヘッダを記述
		var statusCode = 200;
	
		var headers = {
			'Content-Type': 'application/json charset=UTF-8'
		}
		response.writeHead(statusCode, headers);

		//レスポンスボディを記述
		var encode = 'UTF-8';
		response.write(result + '\n', encode);
						
		//レスポンスの終了
		response.end();
	}
};

exports.ServerHelper = ServerHelper;
