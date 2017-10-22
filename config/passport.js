var localStrategy = require("passport-local").Strategy;
var User = require("../app/models/user");

// expose this function to our app using module.exports
module.exports = function(passport) {

    // SESSION SETUP ==========================================================

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP ============================================================

    passport.use(new localStrategy({
        usernameField : "email",
        passwordField : "password",
        passReqToCallback : true,
    },

    function(req, email, password, done) {
        process.nextTick(function() {
            // Check if email is in use
            User.findOne({ "local.email": email }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    console.log("email exists already");
                    return done(null, false, req.flash("signupMessage", "Email already in use."));
                } else {
                    var newUser = new User();
                    newUser.local.email = email;
                    // TODO: Fix username stuff
                    // newUser.local.username = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if (err) throw err;
                        console.log("created user " + email + "successfully");
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
