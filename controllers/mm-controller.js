var express = require("express");

var router = express.Router();

//Need access to the models
let db = require("../models");

// Create all our routes and set up logic within those routes where required.

//Access all players
router.get("/api/players", function (req, res) {
  db.Player.findAll({}).then(function (dbPlayers) {

    console.log(dbPlayers);
    res.json(dbPlayers);
  });
});

router.get("/api/challenges", function (req, res) {
  db.Challenges.findAll({}).then(function (dbChallenges) {

    console.log(dbChallenges);
    res.json(dbChallenges);
  });
});

router.get("/api/players/:email", function(req, res){
  db.Player.findOne({
    where:{
      email: req.params.email
    }
  }).then(function(dbPlayer){
    console.log(dbPlayer);
    res.json(dbPlayer);
  });
});

router.get("/api/players/:game", function(req, res){
  db.Player.findAll({
    where: {
      mainGame: req.params.game
    }
  }).then(function(dbPlayers){
    res.json(dbPlayers);
  });
});

router.get("/api/venues/:id", function(req, res){
  db.Venue.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbVenue){
    res.json(dbVenue);s
  });
});

router.post("/api/players/", function (req, res) {

  db.Player.create(req.body).then(function (dbPlayer) {
    console.log(dbPlayer);
    res.json({ id: dbPlayer.insertId });
  });

});

router.post("/api/challenges", function (req, res) {
  const challenge = {
    player_one: req.body.username,
    prize_pool: req.body.placebets,
    best_of: req.body.best_of,
    venue: req.body.location
  }
  db.Challenges.create(challenge).then(function (dbChallenge) {
    console.log(dbChallenge);
    res.json({ id: dbChallenge.insertId });
  });
});

router.post("/api/venues", function (req, res) {
  db.Venue.create(req.body).then(function (dbVenue) {
    res.json({ id: dbVenue.insertId });
  });
});


router.put("/api/players/", function (req, res) {

  db.Player.update({
    name: req.body.name,
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

router.put("/api/challenges/:id", function (req, res) {

  console.log(req.body.challenge_accepted);
  db.Challenges.update({
    challenge_accepted: req.body.challenge_accepted
  }, {
      where: {
        id: req.params.id
      }
    }).then(function (dbChallenge) {
      if (dbChallenge.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    });
});

router.delete("/api/players/:username", function (req, res) {
  db.Player.destroy({
    where: {
      player_one: req.params.username
    }
  }).then(function (dbPlayer) {

    res.json(dbPlayer);
  });
});

router.delete("/api/challenges/:id", function (req, res) {
  db.Challenges.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbChallenges) {

    res.json(dbChallenges);
  });
});

router.get("/api/challenges/:condition", function (req, res) {
  console.log(req.params.condition)
  db.Challenges.findAll({
    where: {
      challenge_accepted: req.params.condition
    }
  }).then(function (dbChallenges) {
    res.json(dbChallenges);
  })
})
// Export routes for server.js to use.
module.exports = router;
