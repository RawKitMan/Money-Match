const path = require("path");

module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  //To our login page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/login.handlebars"));
  });
  
  //See whoever has challenged the user
  app.get("/challenged", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });

  //If the incorrect URL is provided, 404 page will appear.
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/404.html"));
  });

};