import express from 'express';
import { MongoClient } from 'mongodb';
let router = express.Router();
const url = "mongodb://localhost:27017/cities";

router.get('/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        let collection = db.collection('data');
        collection.find({}).toArray(function(err, docs) {
            res.json(docs);
            db.close();
        });
    });
});

router.post('/', function(req, res) {

    console.log(res);
    MongoClient.connect(url, function(err, db) {
        let collection = db.collection('data');
        console.log(req.body);
        collection.insert({
            itinerary: req.body.itinerary,
            user: res.locals.user.username
        });

        collection.find({}).toArray(function(err, docs) {

            res.write(JSON.stringify(docs));
            //console.log(res.body);
            res.status(200).end();
            db.close();
        })
    });
});


module.exports = router;
