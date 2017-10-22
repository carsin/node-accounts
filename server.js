// PACKAGES
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");

// SETUP
var app = express();
app.set("view engine", "ejs");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/social_network", {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});

// ROUTES
require("./routes/routes.js")(app, passport);

// START SERVER
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
