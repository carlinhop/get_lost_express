var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
		let data = JSON.stringify({text: "hola"});
		console.log(data);
      res.write(data);
      
      res.status(200).end();
});

module.exports = router;