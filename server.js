// SETUP ======================================================================

// packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require ("body-parser");
const session = require("express-session");

// local files
const config = require("./config/config.js")

// vars
const port = process.env.PORT || 8000;

// CONFIG =====================================================================
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/social-network", { keepAlive: true, reconnectTries: Number.MAX_VALUE, useMongoClient: true });

require("./config/passport.js")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(session({ secret: config.expressSessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================
require("./app/routes.js")(app, passport);

// launch ======================================================================
app.listen(port);
console.log("Server started on port " + port);
