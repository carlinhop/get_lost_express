var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		console.log("You're not logged in");
	}
}

module.exports = router;
