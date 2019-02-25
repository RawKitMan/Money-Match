var express = require("express");
var bodyParser = require("body-parser"); 
var session = require("express-session");
var passport = require("./config/passport");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());


// Static directory
app.use(express.static("public"));

//Keep track of the user's login status
app.use(session({ 
  secret: "keyboard cat", 
  resave: true, 
  saveUninitialized: true 
}));
app.use(passport.initialize()); 
app.use(passport.session());


// Routes accessed via controller and html route folder
const routes = require("./controllers/mm-controller.js");
app.use(routes);
require("./routes/html-routes")(app);

// Syncing the models and then start the app
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


