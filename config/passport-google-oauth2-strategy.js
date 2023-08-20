const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "",
    clientSecret:"" ,
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},function(accessToken, refreshToken, profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("Error in google auth",err);
            return;
        }
        console.log(user);
        //if user is found , pass it as req.user
        if(user)
        {
            return done(null,user);   
        }
        //if not fount, create user and then pass it as req.user
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log("error in creating user in google auth",err);
                    return;
                }
                return done(null,user);
            })
        }
    })
}
))