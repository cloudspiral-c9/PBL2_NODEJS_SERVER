
//Moduleの読み込み
var http = require('http');
var url = require('url');
var nutrition = require('NutritionMongoHelper.js');


//サーバの作成
var server = http.createServer();
console.log("Server Create - Success");


//イベントハンドラを登録
server.on('request', requestHandler);

//サーバを起動
var port = 8080;
server.listen(port, function() {
	console.log("Server Listen Start - Success");
});



//リクエスト受信時のハンドラ
function requestHandler(request, response) {

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
		    
		    if (queries['names']) {
		        
		        var foodNames = queries['names'];
				nutrition.getNutritionByFoodNames(foodNames)

				.done( function(result) {
					respondResult(response, result);
				},

				function(err) {
					console.log(err);
				});

			}			
			break;

		default:
			respondResult(response, result);
			break;	
	}
};


//結果をresponseに記述
function respondResult(response, result) {
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
}

