import express from 'express';
import { User, createUser, getUserByUsername, getUserById, comparePassword } from '../models/User';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';



let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');

});

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;


    //validation
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("username", "Username is not an email").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("password2", "Passwords do not match").equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.send(JSON.stringify({ errors: errors }));
    } else {

        let newUser = new User({
            username: username,
            password: password
        });

        createUser(newUser, function(err, user) {
            if (err) throw err;
            res.send(JSON.stringify({ message: "success", user: res.locals.user}));
            res.status(200).end();



        });
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {


        getUserByUsername(username, (err, user) => {

            if (err) throw err;
            if (!user) {
                return done(null, false, { message: "Unknown user",  })
            }

            comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Invalid password" })
                }
            });

        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    getUserById(id, function(err, user) {
        done(err, user);
    });
});


router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        
        res.send(JSON.stringify({ message: "logged in", user: req.user}));
        res.status(200).end();
    });


router.get('/logout', function(req, res){
    req.logout();
    res.send(JSON.stringify({ message: "logged out", user: res.locals.user  }));
    res.status(200).end();

})

module.exports = router;
