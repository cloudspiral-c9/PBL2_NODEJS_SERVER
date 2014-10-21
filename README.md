PBL2_NODEJS_SERVER
==================

DataBase用 Node.jsサーバのリポジトリ

食材とJSONのキーの対応 (食品1gあたりの量)  

API仕様
ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com:8080/nutritionにGETでHTTPリクエストを送る  

クエリの仕様は次の通り  
keyはnames．これがないと結果はnullが返される．  

names=食物名 : 一つだけの結果を返せばよい場合  
names=食物名1&names=食物名2  

よって'ごはん'の栄養価を受信したい際には，  
ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com:8080/nutrition?names=ごはん  

栄養価のjsonのキーの対応は次の通り  
name: 食品名  
energy: エネルギー  
moisuture: 水分  
protein: タンパク質  
lipid: 脂質  
carbohydrate: 炭水化物  
ash: 灰分  
sodium: ナトリウム  
potassium: カリウム  
calcium: カルシウム  
magnesium: マグネシウム  
phosphorus: リン  
iron:  鉄  
zinc: 亜鉛  
copper: 銅  
manganese: マグネシウム  
retinol: レチノール
carotene:  カロテン  
inRetinolAmount: レチノール当量  
vitaminD: ビタミンD  
vitaminE: ビタミンE  
vitaminK: ビタミンK  
vitaminB1: ビタミンB1  
vitaminB2: ビタミンB2  
niacin: ナイアシン  
vitaminB6: ビタミンB6  
vitaminB12: ビタミンB12	
folicAcid: 葉酸  
pantothenicAcid: パントテン酸  
vitaminC: ビタミンC  
saturatedFattyAcid: 飽和脂肪酸  
monounsaturatedFattyAcid: 一価不飽和脂肪酸  
polyunsaturatedFattyAcid: 多価不飽和脂肪酸  
cholesterol: コレステロール  
waterSolubleFiberContaining:	水溶性食物繊維  
waterUnsolubleFiberContaining: 不要性食物繊維  
totalFiberContaining: 食物繊維総量  
solt: 食塩相当量   

登録されている食品名(name)は次の通り  
薄力粉
小麦粉
こむぎこ
中力粉
強力粉
ホットケーキミックス粉
てんぷら粉
食パン
パン
コッペパン
乾パン
フランスパン
ライ麦パン
ぶどうパン
レーズンパン
ロールパン
バターロール
クロワッサン
イングリッシュマフィン
ナン
生うどん
うどん
うどん乾
そうめん乾
ひやむぎ乾
そうめん
ひやむぎ
生中華めん
中華めん
蒸し中華めん
中華めん乾
沖縄そば
沖縄そば乾
即席中華めん 油揚げ味付け
即席中華めん 油揚げ
即席中華めん 非油揚げ
スナックめん
マカロニ
スパゲッティ
マカロニゆで
スパゲッティゆで
生ふ
ふ
竹輪ふ
ぎょうざの皮
しゅうまいの皮
ピザクラス
生パン粉
パン粉
米
こめ
ごはん
御飯
全粥
五分粥
おもゆ
重湯
アルファ化米
おにぎり
焼きおにぎり
きりたんぽ
上新粉
ビーフン
もち
赤飯
あくまき
白玉粉
道明寺粉
そば粉
生そば
そば
そば乾
コーンミール
コーングリッツ
コーンフラワー
ジャイアントコーン
ポップコーン
コーンフレーク
はとむぎ
こんにゃく
しらたき
さつまいも
焼きいも
干しいも
さといも
やつがしら
じゃがいも
フライドポテト
マッシュポテト
いちょういも
ながいも
やまといも
じねんじょ
くずでん粉
でん粉
でんぷん
くずきり
ピオカパール
はるさめ
砂糖
さとう
グラニュー糖
角砂糖
氷砂糖
コーヒーシュガー
粉あめ
水あめ
はちみつ
メープルシロップ
あずき
小豆缶詰
小倉缶
こしあん
いんげんまめ
うずら豆
うずらまめ
豆きんとん
まめきんとん
えんどう
うぐいす豆
うぐいすまめ
ささげ
そらまめ
おたふく豆
おたふくまめ
ふき豆
だいず
大豆
だいず水煮
大豆水煮
きな粉
きなこ
木綿豆腐
豆腐
とうふ
絹ごし豆腐
ソフト豆腐
焼き豆腐
生揚げ
なまあげ
油揚げ
あぶらあげ
がんもどき
凍り豆腐
高野豆腐
納豆
なっとう
おから
調製豆乳
豆乳
生湯葉
ゆば
干し湯葉
金山寺みそ
スライスアーモンド
アーモンド
えごま
カシューナッツ
かぼちゃのたね
ぎんなん
ゆでぎんなん
くり
ゆでくり
くり甘露煮
甘ぐり
くるみ
けし
ココナッツパウダー
ごま
いりごま
むきごま
しい
すいかのたね
とち
ひし
ピスタチオ
ひまわりのたね
ブラジルナッツ
ヘーゼルナッツ
マカダミアナッツ
まつのみ
らっかせい
ピーナッツ
ピーナッツバター
あさつき
あしたば
アスパラガス
いんげん
うど
やまうど
えだまめ
エンダイブ
トウミョウ
きぬさや
スナップえんどう
グリンピース
おかひじき
オクラ
かぶの葉
かぶ
かぶの葉塩もみ
かぶ塩もみ
かぶぬか漬
かぼちゃ
そうめんかぼちゃ
からしな
からしな漬
カリフラワー
かんぴょう
きく花
キャベツ
きゃべつ
グリーンボール
レッドキャベツ
きゅうり
きゅうり漬
つけもの
漬け物
きゅうりしょうゆ漬
きゅうりぬか漬
ピクルス
ぎょうじゃにんにく
きょうな
きょうな漬
キンサイ
クレソン
くわい
ケール
こごみ
ごぼう
こまつな
ザーサイ
さんとうさい
さんとうさい漬
ししとうがらし
しそ
しその実
しゅんぎく
じゅんさい
葉しょうが
しょうが
しょうが酢漬
しょうが甘酢漬
ズッキーニ
せり
セロリ
ぜんまい
そらまめ
タアサイ
かいわれだいこん
だいこん葉
だいこん
切干だいこん
切干しだいこん
切干大根
だいこんぬか漬
たくあん
守口漬
べったら漬
福神漬
つまみな
たかな
たかな漬
たけのこ
しなちく
たまねぎ
たまねぎ水さらし
ゆでたまねぎ
赤たまねぎ
たらのめ
チコリー
チンゲンサイ
つくし
つるな
つるむらさき
とうがらし
とうがん
コーン
クリームコーン
ヤングコーン 
トマト
とまと
ミニトマト
トマト缶
トマトジュース
無塩トマトジュース
トマトミックスジュース
無塩トマトミックスジュース
とんぶり
なす
べいなす
なす漬
なすぬか漬
なすこうじ漬
なすからし漬
しば漬
なずな
なのはな
にがうり
にら
花にら
黄にら
にんじん葉
にんじん
ゆでにんじん
にんじんジュース
ミニキャロット
にんにく
茎にんにく
ねぎ
葉ねぎ
こねぎ
のざわな漬
のざわな調味漬
のびる
はくさい
ゆではくさい
はくさい漬
キムチ 
パクチョイ
バジル
パセリ
はつかだいこん
はやとうり
はやとうり漬
ピーマン
赤ピーマン
黄ピーマン
トマピー
ふき
ふきのと
ブロッコリー
ほうれんそう
ホウレンソウ
ほうれん草
ほうれんそう夏
ほうれんそう冬
ラディシュ
まこも
みつば
みょうが
みょうがたけ
むかご
めキャベツ
めたで
アルファルファもやし
もやし
モロヘイヤ
やまごぼうみそ漬
ゆりね
よもぎ
らっかせい
らっきょう
エシャロット
レタス
サラダな
リーフレタス
サニーレタス
れんこん
わけぎ
わさび
わさび漬
わらび
あけび
アセロラ
アセロラ飲料
アボカド
あんず
アンズ
乾燥あんず
アンズ缶
アンズジャム
低糖アンズジャム
いちご
イチゴ
いちごジャム
イチゴジャム
低糖イチゴジャム
イチジク
いよかん
イヨカン
梅干し
梅干し調味漬
うめびしお
うめ飲料
みかん
ミカン
みかんストレートジュース
みかん濃縮還元ジュース
ミカンジュース
みかん果粒入りジュース
みかん50%果汁入り飲料
みかん20%果汁入り飲料
みかん缶
ミカン缶
ミカン缶汁
バレンシアオレンジ
オレンジストレートジュース
オレンジジュース
オレンジ濃縮還元ジュース
オレンジ50%果汁入り飲料
オレンジ30%果汁入り飲料
マーマレード
低糖マーマレード
柿
カキ
干し柿
かぼす
カボス
カリン
キウイフルーツ
キワノ
きんかん
キンカン
グァバ
グァバジュース
グズベリー
グミ
グレープフルーツ
グレープフルーツルビー
グレープフルーツストレートジュース
グレープフルーツ濃縮還元ジュース
グレープフルーツジュース
グレープフルーツ50%果汁入り飲料
グレープフルーツ20%果汁入り飲料
グレープフルーツ缶
ココナッツミルク
ゴレンシ
さくらんぼ
サクランボ
アメリカンチェリー
サクランボ缶
ざくろ
ザクロ
さんぼうかん
サンポウカン
すいか
スイカ
すだち
スダチ
すもも
スモモ
プルーン
だいだい
ダイダイ
タンゴール
ドリアン
なし
ナシ
なし缶
ナシ缶
洋なし
洋ナシ
洋なし缶
洋ナシ缶
なつみかん
ナツミカン
ナツミカン缶
なつみかん缶
パイン
パインストレートジュース
パイン濃縮還元ジュース
パインジュース
パイン50%果汁入り飲料
パイン10%果汁入り飲料
パイン缶詰
ハスカップ
はっさく
ハッサク
パッションフルーツ
バナナ
パパイヤ
ピタヤ
びわ
ビワ
びわ缶
ビワ缶
ぶどう
ブドウ
干しぶどう
レーズン
ぶどうストレートジュース
ぶどう濃縮還元ジュース
ブドウジュース
ぶどう70%果汁入り飲料
ぶどう10%果汁入り飲料
ぶどう缶
ブドウ缶
ぶどうジャム
ブドウジャム
ブルーベリー
ブルーベリージャム
ぶんたん
ブンタン
ぽんかん
ポンカン
マンゴー
マンゴスチン
メロン
もも
モモ
もも30%果汁入り飲料
白桃缶詰
黄桃缶
モモ缶
もも缶汁
モモ缶汁
ネクタリン
やまもも
ヤマモモ
ゆず果皮
ゆず果汁 
ゆず
ユズ
ライチー
ライム
ラズベリー
りんご
リンゴ
りんごストレートジュース
リンゴジュース
りんご濃縮還元ジュース
りんご50%果汁入り飲料
りんご30%果汁入り飲料
りんご缶
リンゴ缶
りんごジャム
リンゴジャム
レモン
レモン汁
えのきたけ
えのき
えのきたけ味付け瓶詰
なめたけ
きくらげ
しいたけ
干しいたけ
しめじ
ほんしめじ
たもぎたけ
なめこ
なめこ缶
ぬめりすぎたけ
ひらたけ
エリンギ
まいたけ
マッシュルーム
マッシュルーム缶
まつたけ
まつたけ缶
あおのり
焼きのり
のり
あじつけのり
味付けのり
いわのり
だしこんぶ 
刻み昆布
削り昆布
塩昆布
こんぶつくだ煮
ところてん
寒天
赤とさか
青とさか
ひじき
のりつくだ煮
のりつく
減塩のりつく
もずく
生わかめ
カットわかめ
カットワカメ
めかぶわかめ
あいなめ
あこうだい
まあじ
あじ
あじ開き
むろあじ
むろあじ開き
くさや
あなご
あまご
あまだい
あゆ
うるか
あんこう
あんこうきも
いさき
いしだい
いとよりだい
いぼだい
うるめいわし
いわし
いわし丸干し
めざし
しらす干し
たたみいわし
いわしみりん干し
いわしかば焼缶
いわな
うぐい
うなぎ
うなぎきも
うなぎ白焼き
うなぎかば焼
うまづらはぎ
えい
えそ
おいかわ
おおさが
おこぜ
おひょう
かさご
かじか
かじき
かつお
なまり節
かつお節
削り節
削り節つくだ煮
かます
かれい
かわはぎ
かんぱち
きす
きびなご
キャビア
キングクリップ
ぎんだら
きんめだい
ぐち
こい
鮭
さけ
鮭水煮缶
塩鮭
イクラ
すじこ
にじます 
さば
さば節
塩さば
さば開き
しめさば
さば缶
さばみそ煮缶
ふかひれ
さより
さわら
さんま
さんま開き
さんまかば焼缶
しいら
ししゃも
したびらめ　生  
しまあじ
しらうお
シルバー
すずき
たい
たかさご
たかべ
たちうお
すけとうだら
たらこ
からしめんたいこ
まだら
たらしらこ
塩だら
桜でんぶ
テラピア
どじょう
とびうお
なまず
にしん
身欠きにしん
かずのこ
はぜ
はぜつくだ煮
はぜ甘露煮
はたはた
はも
バラクータ
ひらまさ
ひらめ
ふぐ
ふな
ぶり
はまち
ほうぼう
ホキ
ほっけ
塩ほっけ
ほっけ開き
ぼら
からすみ
まぐろ
まぐろ赤身
まぐろ脂身
めじまぐろ
まぐろ味付缶
ツナ
まながつお
むつ
めじな
めばる
メルルーサ
やまめ
わかさぎ
あかがい
あさり
あさりつくだ煮
あさり水煮
あわび
干しあわび
エスカルゴ
かき
蛎
さざえ
しじみ
たいらがい
たにし
つぶがい
とこぶし
とりがい
ばいがい
ばかがい
はまぐり
はまぐりつくだ煮
ほたてがい
貝柱
ほっきがい
みるがい
あまえび
いせえび
くるまえび
さくらえび
大正えび
しばえび
ブラックタイガー
えび
むきえび
毛がに
ずわいがに
かに
ずわいがに缶
たらばがに
たらばがに缶
こういか
するめいか
ほたるいか
やりいか
するめ
さきいか
いかくん製
いか塩辛
いいだこ
まだこ
ゆでだこ
あみつく
あみ塩辛
うに
おきあみ
くらげ
しゃこ
なまこ
このわた
ほや
ほや塩辛
かに風味かまぼこ
かまぼこ
焼き竹輪
ちくわ
だて巻
だてまき
つみれ
なると
はんぺん
さつま揚げ
さつまあげ
魚肉ハム
魚肉ソーセージ
ソーセージ
いのしし
いのぶた
うさぎ
和牛肉
牛かたロース
牛リブロース
牛サーロイン
牛ばら
牛もも
牛肉
ぎゅうにく
牛ヒレ
牛ひき肉
牛レバー
ローストビーフ
コンビーフ
ビーフジャーキー
馬肉
くじら
しか肉
豚かたロース
豚ロース
豚ばら
豚もも
豚肉
ぶたにく
豚ひき肉
豚レバー
豚足
ロースハム
ハム
生ハム
ベーコン
ウインナー
フランクフルト  
焼き豚
レバーペースト
ゼラチン
マトン
あいがも
あひる
うずら
かも
きじ
しちめんちょう
すずめ
手羽
とりむね肉
とりむね肉皮なし
鶏もも
鶏肉
とりにく
鶏もも皮なし
とりにく皮なし
鶏肉皮なし
ささ身
ささみ
鶏ひき肉
とりひきにく
とりひき皮なし
鶏レバー
焼き鳥缶
はと
フォアグラ
ほろほろちょう
いなごつくだ煮
かえる
すっぽん
うずら卵
うずらたまご
たまご
卵黄
卵白
たまご豆腐
厚焼きたまご
だし巻きたまご
ピータン
牛乳
ぎゅうにゅう
低脂肪牛乳
コーヒー牛乳
いちご牛乳
フルーツ牛乳
脱脂粉乳
練乳
クリーム
ホイップクリーム
コーヒークリーム
無糖ヨーグルト
ヨーグルト
ヨーグルトドリンク
乳酸菌飲料
ジョア
カマンベールチーズ
チーズ
クリームチーズ
パルメザンチーズ
粉チーズ
ブルーチーズ
ロセスチーズ
アイスクリーム
アイスミルク
ラクトアイス
ソフトクリーム
シャーベット
人乳
やぎ乳
オリーブ油
ごま油
サフラワー油
大豆油
調合油
油
とうもろこし油
なたね油
パーム油
ひまわり油
綿実油
落花生油
牛脂
ラード
バター
無塩バター
発酵バター
マーガリン
ショートニング
甘納豆
生八つ橋
今川焼
ういろう
うぐいすもち
かしわもち
カステラ
かのこ
かるかん
きび団子
ぎゅうひ
きんつば
草もち
くし団子あん
くし団子しょうゆ
げっぺい
桜もち関東風
桜もち関西風
大福もち
タルト
ちまき
どら焼
ねりきり
カステラまんじゅう
くずまんじゅう
くりまんじゅう
とうまんじゅう
蒸しまんじゅう
あんまん
肉まん
もなか
ゆべし
ようかん
水ようかん
あめ玉
芋かりんとう
おこし
かりんとう
ごかぼう
いそべせんべい
かわらせんべい
巻きせんべい
南部せんべい
中華風クッキー
ひなあられ関東風
ひなあられ関西風
揚げせんべい
甘辛せんべい
あられ
塩せんべい
タマゴボーロ
八つ橋
らくがん
あんパン
クリームパン
ジャムパン
チョココロネ
シュークリーム
チーズババロアシュークリーム
エクレア
スポンジケーキ
ショートケーキ
ケーキ
デニッシュペストリー
イーストドーナッツ
ドーナッツ
パイ皮
アップルパイ
ミートパイ
バターケーキ
ホットケーキ
ワッフル
カスタードプディング
オレンジゼリー
ゼリー
コーヒーゼリー
ミルクゼリー
ワインゼリー
ババロア
ウエハース
クラッカー
サブレ
ハードビスケット
ソフトビスケット
ロシアケーキ
小麦粉あられ
コーンスナック
ポテトチップス
キャラメル
ゼリーキャンデー
ゼリービーンズ
ドロップ
マシュマロ
チョコレート
ホワイトチョコレート
ミルクチョコレート
マロングラッセ
板ガム
糖衣ガム
風船ガム
酒
純米酒
本醸造酒
吟醸酒
純米吟醸酒
ビール
発泡酒
白ワイン
赤ワイン
ワイン
ロゼワイン
紹興酒
しょうちゅう
ウイスキー
ブランデー
蒸ウオッカ
ジン
ラム
マオタイ酒
梅酒
合成清酒
料理酒
白酒
みりん
キュラソー
玉露浸出液
抹茶
せん茶浸出液
番茶浸出液
ほうじ茶浸出液
玄米茶浸出液
ウーロン茶浸出液
紅茶浸出液
コーヒー浸出液
インスタントコーヒー
コーヒー飲料
ココア
ミルクココア
甘酒
昆布茶
炭酸飲料
コーラ
サイダー
麦茶浸出液
ウスターソース
ソース
中濃ソース
濃厚ソース
トウバンジャン
チリペッパーソース
ラー油
こいくちしょうゆ
しょうゆ
醤油
減塩醤油
減塩P醤油
P醤油
Pしょうゆ
P醤油
うすくちしょうゆ
薄口醤油
塩
穀物酢
酢
米酢
ぶどう酢
りんご酢
かつおだし
すましじる
すまし汁
昆布だし
かつお・昆布だし
しいたけだし
煮干しだし
鳥がらだし
中華だし
中華スープ
洋風だし
洋風スープ
コンソメスープ
スープ
コンソメ
中華スープストック
スープストック
顆粒風味調味料
和風だし
めんつゆ
かき油
オイスターソース
マーボー豆腐の素
麻姿豆腐の素
ミートソース
ピューレー
トマトピューレー
ペースト
トマトペースト
ケチャップ
トマトソース
チリソース
ドレッシングタイプ和風調味料
フレンチドレッシング
Fドレ
ドレッシング
Pドレ
サウザンアイランドドレッシング
サウザンドレ
マヨネーズ 全卵型
マヨネーズ 卵黄型
マヨネーズ
みそ
みそしる
白みそ
赤みそ
たいみそ 
減塩たいみそ 
減塩ゆずみそ 
減塩かつおぶしみそ 
ゆずみそ 
減塩かつお節みそ 
かつおぶしみそ 
かつお節みそ 
即席みそ粉末
即席みそペーストタイプ
カレールウ
ハヤシルウ
酒かす
みりん風調味料
オールスパイス
オニオンパウダー
からし粉
練りからし
マスタード
粒入りマスタード
カレー粉
クローブ
黒こしょう
白こしょう
こしょう
コショー
コショウ
粉さんしょう
シナモン
しょうが粉
おろししょうが
セージ
タイム
チリパウダー
とうがらし
ナツメグ
ガーリックパウダー
おろしにんにく
バジル粉
乾燥パセリ
パプリカ
わさび粉
練りわさび
ベーキングパウダー
カレーレトルトパウチ
ぎょうざ
ギョウザ
餃子
グラタン
コーンクリームスープ粉末
コーンクリームスープレトルトパウチ
クリームコロッケ
コロッケ
牛肉コロッケ
カニクリームコロッケ
イカフライ
イカリングフライ
エビフライ
白身魚フライ
シチューレトルトパウチ
しゅうまい
シュウマイ
焼売
ハンバーグ
ピラフ
ミートボール
メンチカツ
海鮮ステーキ
マービージャム
マービー
マービー液
照焼つくね
ひとくちがんもどき
一口がんも
いちごジャム
マーガリン
ジャム＆マーガリン
オレンジ





