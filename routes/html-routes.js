const path = require("path");

module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  //To our login page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });
  
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  });
  
  //See whoever has challenged the user
  app.get("/challenges", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/challenges.html"));
  });

  app.get("/find-challenge"), function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  }

  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/contact.html"));
  });
  //If the incorrect URL is provided, 404 page will appear.
  app.get("/404", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/404.html"));
  });

};