var express = require('express');
var router = express.Router();

var checkLoggedIn = function(req, res, next) {
	
	if (!req.user) {
		console.log('not logged-in');
		res.redirect('http://ec2-54-64-199-130.ap-northeast-1.compute.amazonaws.com/recipeers/public/');
	} else {
		next();
	}
};

/* GET home page. */
router.get('/login/roomselect', checkLoggedIn, function(req, res) {
	console.log('get roomselect');
  	res.render('views/login/room-select.html');
});


module.exports = router;
