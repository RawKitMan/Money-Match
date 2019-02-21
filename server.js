let express = require("express");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

passport.use(new Strategy(
  function(username, password, cb) {
    db.Players.findOne({
      where: {
        username: username
      }
    }).then(function(err, user){
      
      if(!user) {return cb(null, false, { message: 'Incorrect username.' });}
      if(user.password != password){return cb(null, false, { message: 'Incorrect password.' });}
      return cb(null, user);
    }).catch(err => cb(err))
  }
));

passport.serializeUser(function(user ,cb){
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
  db.Players.findOne({
    where:{
      id: id
    }
  }).then(function(err, user){
    if (err) {return cb(err);}
    cb(null, user);
  });
});


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.use(passport.initialize())
app.use(passport.session())

// Routes accessed via controller and html route folder
const routes = require("./controllers/mm-controller.js");
app.use(routes);
require("./routes/html-routes")(app, passport);



// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
