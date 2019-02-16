var express = require("express");

var router = express.Router();

//Need access to the models
let db = require("../models");

// Create all our routes and set up logic within those routes where required.

//Access all players
router.get("/", function (req, res) {
  db.Player.findAll({}).then(function (dbPlayers) {

    console.log(dbPlayers);
    res.json(dbPlayers);
  });
});

router.get("/players/:game", function(req, res){
  db.Player.findAll({
    where: {
      mainGame: req.params.game
    }
  }).then(function(dbPlayers){
    res.json(dbPlayers);
  });
});

router.get("/venues/:id", function(req, res){
  db.Venue.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbVenue){
    res.json(dbVenue);
  });
});

router.post("/api/players", function (req, res) {

  db.Player.create(req.body).then(function (dbPlayer) {
    console.log(dbPlayer);
    res.json({ id: dbPlayer.insertId });
  });

});

router.post("/api/venues", function (req, res) {
  db.Venue.create(req.body).then(function (dbVenue) {
    res.json({ id: dbVenue.insertId });
  });
});


router.put("/api/players", function (req, res) {

  db.Player.update({
    age: req.body.age,
    username: req.body.username,
    password: req.body.password,
    mainGame: req.body.mainGame
  }, {
      where: {
        id: req.body.id
      }
    }).then(function (dbPlayer) {
      if (dbPlayer.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    });
});

router.put("/api/venues/:id", function (req, res) {

  db.Venue.update({
    location: req.body.location,
    address: req.body.address,
    phone: req.body.phone,
  }, {
      where: {
        id: req.body.id
      }
    }).then(function (dbVenue) {
      if (dbVenue.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    });
});

// Export routes for server.js to use.
module.exports = router;
