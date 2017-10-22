module.exports = function(app, passport) {
    // HOME PAGE (with login links) ========
    app.get("/", function(req, res) {
        res.render("index.ejs");
    });

    // LOGIN ===============================
    app.get("/login", function(req, res) {
        res.render("login.ejs", { message: req.flash("loginMessage") });
    });

    // app.post("/login", do all our passport stuff here);

    // SIGNUP ==============================
    app.get("/signup", function(req, res) {
        res.render("signup.ejs", { message: req.flash("signupMessage") });
    });

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/",
        successRedirect: "/signup",
        failureFlash: true
    }));

    // PROFILE SECTION =====================
    app.get("/profile", isLoggedIn, function(req, res) {
        res.render("profile.ejs", {
            user : req.user // get the user out of session and pass to template
        });
    });

    // LOGOUT ==============================
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren"t redirect them to the home page
    res.redirect("/");
}
