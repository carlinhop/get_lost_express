import express from 'express';
import {User, createUser} from '../models/User';



let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});

router.post('/', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;
    

    //validation
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("username", "Username is not an email").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("password2", "Passwords do not match").equals(req.body.password);



    let errors = req.validationErrors();

    if(errors){
        console.log(errors);
        res.send(JSON.stringify({errors: errors}));
    }
    else{
        console.log(User);
        let newUser = new User({
            username: username,
            password: password
            });

        createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
            
            
            
        });


    }

    


});

module.exports = router;