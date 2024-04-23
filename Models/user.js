const mongoose =  require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required : true
    }
});

// plugin is used coz it automatically takes username, password , hashing
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);