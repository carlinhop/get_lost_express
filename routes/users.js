import express from 'express';
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;
    console.log(req.body);
});

module.exports = router;