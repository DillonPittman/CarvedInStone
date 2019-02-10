require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport   = require('passport')
var session    = require('express-session')
var env        = require('dotenv').load()
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var bodyParser = require("body-parser");
require('./config/config.json');
var app = express();

app.use(express.static(__dirname +'/public'));
//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Models
var models = require("./models");

//Routes
var authRoute = require('./routes/auth.js')(app,passport);

//load passport strategies
require('./config/passport/passport.js')(passport,models.user);


////Sync Database
//models.sequelize.sync().then(function(){
//console.log('Nice! Database looks fine')
//
//}).catch(function(err){
//console.log(err,"Something went wrong with the Database Update!")
//});


// Routes General
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
