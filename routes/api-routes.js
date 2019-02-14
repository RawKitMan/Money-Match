var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the players in the database
  app.get("/api/players", function (req, res) {
    db.Player.findAll({}).then(function (dbPlayer) {
      res.json(dbPlayer)
    })
  });

  app.get("/api/players/:id", function (req, res) {
    db.Player.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // POST route for saving a new player. You can create a player using the data on req.body
  app.post("/api/players", function (req, res) {
    db.Player.create(reg.body).then(function (dbPlayer) {
      res.json(dbPlayer);
    })
  });

  // DELETE route for deleting players. You can access the player's id in req.params.id
  app.delete("/api/players/:id", function (req, res) {

    db.Player.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPlayer) {
      res.json(dbPlayer)
    })
  });

  // PUT route for updating players. Need to be sure username is unique.
  app.put("/api/players", function (req, res) {

    db.Player.update({
      age: req.body.age,
      username: req.body.username,
      password: req.body.password,
      gamesPlayed: req.body.gamesPlayed
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (dbPlayer) {
        res.json(dbPlayer);
      });
  });
};