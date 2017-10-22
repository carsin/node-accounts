// SETUP ======================================================================

// packages
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require ("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();

// local files
const config = require("./config/config.js")

// CONFIG =====================================================================
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/social-network", { keepAlive: true, reconnectTries: Number.MAX_VALUE, useMongoClient: true });

require("./config/passport.js")(passport);

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(session({ secret: config.expressSessionSecret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride());

// routes ======================================================================
require("./app/routes.js")(app, passport);

// launch ======================================================================
app.listen(3000);
console.log("Server started on port " + 3000);
