let path = require("path");
let isAuthenticated = require("../config/middleware/isAuthenticated"); 

module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) { // If the user already has an account send them to the members page 
    if (req.user) { 
      res.redirect("/challenges"); 
    } 
    res.sendFile(path.join(__dirname, "../public/signup.html")); 
  });

  app.get("/login", function(req, res) { // If the user already has an account send them to the members page 
    if (req.user) { 
      res.redirect("/challenges"); 
    } 
    res.sendFile(path.join(__dirname, "../public/login.html")); 
  });

  //To our signup page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });
  
  //To our login page if an account is already set up for the user
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  });
  
  //See whoever has challenged the user
  app.get("/challenges", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../views/challenges.html"));
  });

  //Potential New Route
  app.get("/find-challenge", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../views/find-challenges.html"));
  });

  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/contact.html"));
  });
  //If the incorrect URL is provided, 404 page will appear.
  app.get("/404", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/404.html"));
  });

};