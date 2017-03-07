import express from 'express';
import { MongoClient } from 'mongodb';
let router = express.Router();
const url = "mongodb://localhost:27017/cities";

router.get('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        let collection = db.collection('data');
        collection.find({user: res.locals.user.username }).toArray(function(err, docs) {
            if (err) throw err;
            console.log(docs[0].itinerary);
            res.write(JSON.stringify({cities: docs[0].itinerary}));
            res.status(200).end();
            db.close();
        });
    });
});

router.post('/', function(req, res) {


    MongoClient.connect(url, function(err, db) {
        let collection = db.collection('data');
        let users = db.collection('users');
        let user = users.find({ username: res.locals.user.username });

        collection.find({ user: res.locals.user.username }).toArray((err, docs) => {

            if (err) throw err


            if (docs.length === 0) {
                console.log("no docs");
                collection.insert({
                    itinerary: req.body.itinerary,
                    user: res.locals.user.username
                });

                collection.find({ user: res.locals.user.username }).toArray(function(err, docs) {

                    res.write(JSON.stringify(docs));
                    //console.log(res.body);
                    res.status(200).end();
                    db.close();
                });



            } else {

                collection.find({ user: res.locals.user.username }).toArray((err, docs) => {

                    if (err) throw err

                    collection.update({ user: res.locals.user.username }, {
                        itinerary: req.body.itinerary,
                        user: res.locals.user.username
                    });

                    collection.find({ user: res.locals.user.username }).toArray(function(err, docs) {

                        res.write(JSON.stringify(docs));
                        //console.log(res.body);
                        res.status(200).end();
                        db.close();
                    });

                });


            }


        });

    });
});


module.exports = router;
