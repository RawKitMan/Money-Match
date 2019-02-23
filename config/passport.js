//we import passport packages required for authentication 
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy; // //We will need the models folder to check passport agains 
let db = require("../models"); // // Telling passport we want to use a Local Strategy. In other words, //we want login with a username/email and password 

passport.use( new LocalStrategy({ usernameField: "email" }, function (email, password, done) { // When a user tries to sign in this code runs 
    console.log("Running")
    db.Player.findOne({
        where: {
            email: email
        }
    }).then(function (dbPlayer) { // If there's no user with the given email 
        if (!dbPlayer) {
            return done(null, false, { message: "Incorrect email." });
        } // If there is a user with the given email, but the password the user gives us is incorrect 
        else if (!dbPlayer.validPassword(password)) {
            return done(null, false, { message: "Incorrect password." });
        } // If none of the above, return the user 

        return done(null, dbPlayer);
    });
})); 

// In order to help keep authentication state across HTTP requests, // Sequelize needs to serialize and deserialize the user // Just consider this part boilerplate needed to make it all work 
passport.serializeUser(function(player, cb) { 
    cb(null, player); 
}); 
passport.deserializeUser(function(obj, cb) { 
    cb(null, obj); 
});

module.exports = passport;