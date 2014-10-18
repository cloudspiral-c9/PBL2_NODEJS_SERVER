PBL2_NODEJS_SERVER
==================

DataBase用 Node.jsサーバのリポジトリ

食材とJSONのキーの対応 (食品1gあたりの量)

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

API仕様
ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com/nutritionにGETでHTTPリクエストを送る  

クエリの仕様は次の通り  
keyはnames．これがないと結果はnullが返される．  


names=食物名 : 一つだけの結果を返せばよい場合  
names[]=食物名1&names[]=食物名2  

よって'ごはん'の栄養価を受信したい際には，  
ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com/nutrition?names=ごはん  




