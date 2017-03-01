/**
 * Created by carlospereira on 27/02/2017.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';



let UserSchema = mongoose.Schema({
   username:{
       type: String,
       index: true
   },
    password:{
       type: String
    }
});

let User = mongoose.model("User", UserSchema);

function createUser(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback)
        });
    });
}

export {User, createUser};
