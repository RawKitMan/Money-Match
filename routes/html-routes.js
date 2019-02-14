var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Player.findAll({}).then(function(dbPlayers) {
      res.render("index", {
        msg: "Welcome!",
        players: dbPlayers
      });
    });
  });

  //Finds a player with a specific id
  app.get("/players/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbPlayer) {
      res.render("player", {
        player: dbPlayer
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
