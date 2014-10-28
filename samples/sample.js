
//Moduleの読み込み
var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var events = require('events');
var nutrition = require('NutritionMongoHelper.js');

//サーバの作成
var server = http.createServer(callback);

//サーバを起動
//引数は(port, [hostname], [backlog], [callback])
var port = 8080;
var hostname = 'ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com';
server.listen(port, hostname);

//サーバには以下のようにイベントを登録していく
var event = 'request'
var requestCallback = function(request, response) {

	//GETの場合
	//URLのパース
	//第二引数はクエリもパースするかどうか
	if (request.method == 'GET') {
		var doParseQuery = true;
		var parsedObject = url.parse(request.url, doParseQuery);
		var queryKeyValuesMap = parsedObject.query;
	} 

	//POSTの場合
	else if (request.method = 'POST') {

		var data = '';

		//メッセージのボディを取得した際に発火する
		//chunkは受信データの断片
		request.on('data', function(chunk) {
			data += chunk;
		});

		//データの受信完了時に呼ばれる
		//ここでデータは完成している
		request.on('end', function() {
 			
 			//クエリのパース
			var parsedObject2 = querystring.parse(data);

		});
	}
	

	//レスポンスヘッダを記述
	var statusCode = 200;
	var headers = {
		'Content-Type': 'text/json charset=UTF-8'
	}
	response.writeHead(statusCode, headers);

	var now = new Date().toString();
	response.setHeader('Last-Modified', now);


	//レスポンスボディを記述
	//request.urlはこちらのどこにアクセスしてきたかを表す
	//HTTPヘッダは改行コード区切り
	var encode = 'UTF-8';
	response.write('URL: ' + request.url + '\n', encode);

	//リクエストのメソッド
	response.write('Method: ' request.method + '\n', encode);

	//レスポンスの終了
	response.end();
};
//サーバにrequestイベントを登録
server.on(event, requestCallback);

