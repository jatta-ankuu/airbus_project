const mongoose = require("mongoose");
const passport = require("passport");
const schema = mongoose.Schema; 
const localmongoose = require("passport-local-mongoose");


const userschema = new schema({
    email:{
        type: String,
        required: true
    }
});
userschema.plugin(localmongoose);
const User = mongoose.model("User", userschema);
module.exports= User;