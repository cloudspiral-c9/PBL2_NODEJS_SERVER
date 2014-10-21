
//Moduleの読み込み
var http = require('http');
var url = require('url');
var nutrition = require('NutritionMongoHelper.js');

//サーバの作成
var server = http.createServer();
console.log("Server Create - Success");

//リクエスト受信時のハンドラ
var requestHandler = function(request, response) {

	//GETメソッド以外は受け付けない
	if (request.method != 'GET') {
		return;
	}

	var parsedObject = url.parse(request.url, true);
	var path = parsedObject.pathname;
	var queries = parsedObject.query;

	//ここでアクセスしてきたパスによって処理を分岐
	var result = null;
	switch (path) {
		
		case '/nutrition':
		    if (queries['names'] != undefined) {
		        var foodNames = queries['names'];
				result = nutrition.getNutritionsByFoodNames(foodNames);
			}			
			break;

		default:
			break;	
	}

	//レスポンスヘッダを記述
	var statusCode = 200;
	var headers = {
		'Content-Type': 'application/json charset=UTF-8'
	}
	response.writeHead(statusCode, headers);


	//レスポンスボディを記述
	var encode = 'UTF-8';
	response.write('nutrition:' + result + '\n', encode);
	
	//レスポンスの終了
	response.end();
};

//イベントハンドラを登録
server.on('request', requestHandler);

//サーバを起動
//引数は(port, [hostname], [backlog], [callback])
var port = 8080;
server.listen(port, function() {
	console.log("Server Listen Start - Success");
});


