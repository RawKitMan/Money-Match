let path = require("path");
let isAuthenticated = require("../config/middleware/isAuthenticated");
var passport = require("../config/passport");

module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  //Takes the user to the sign up page. If the user has an account, the app goes to the challenges route
  app.get("/", function (req, res) { 
    if (req.user) {
      res.redirect("/challenges");
    }
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });

  //Takes the user to the sign up page. If the user has an account, the app goes to the challenges route
  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/challenges");
    }
    res.sendFile(path.join(__dirname, "../views/login.html"));
  });

  //To our signup page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });

  //See all active challenges from various players for various games
  app.get("/challenges", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../views/challenges.html"));
  });

  //Sends the user to where they can create a challenge or accept an available challenge
  app.get("/find-challenge", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../views/find-challenges.html"));
  });

  //Takes the user to the Locations map page
  app.get("/watchMatches", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../views/watchMatches.html"));
  });

  //Takes the user to our contact page
  app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/contact.html"));
  });
  //If the incorrect URL is provided, 404 page will appear.
  app.get("/404", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../views/404.html"));
  });

};