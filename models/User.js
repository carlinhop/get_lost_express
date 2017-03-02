/**
 * Created by carlospereira on 27/02/2017.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.Promise = global.Promise;

let UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    }
});

let User = mongoose.model("User", UserSchema);

let createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

let getUserByUsername = function(username, callback) {
    let query = { username: username };
    User.findOne(query, callback);

};

let comparePassword = function(cadidatePassword, hash, callback) {
    bcrypt.compare(cadidatePassword, hash, function(err, isMatch){
        if (err) throw err;
        console.log(isMatch);
        callback(null, isMatch);
    });
}

let getUserById = function(id, callback) {
    User.findUserById(id, callback);
};

export { User, createUser, getUserByUsername, comparePassword, getUserById };
