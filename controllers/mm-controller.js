var express = require("express");
var router = express.Router();

//Need access to the models
let db = require("../models");

var passport = require("../config/passport");

// Create all our routes and set up logic within those routes where required.

router.post("/api/players/login", passport.authenticate("local", { failureMessage: "Could not authenticate" }), function (req, res) {
  res.json({ success: true });
});

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

router.get("/api/players/:email", function (req, res) {
  db.Player.findOne({
    where: {
      email: req.params.email
    }
  }).then(function (dbPlayer) {
    console.log(dbPlayer);
    res.json(dbPlayer);
  });
});

router.get("/api/players/:game", function (req, res) {
  db.Player.findAll({
    where: {
      mainGame: req.params.game
    }
  }).then(function (dbPlayers) {
    res.json(dbPlayers);
  });
});

//Account creation
router.post("/api/players", function (req, res) {
  console.log(req.body);
  db.Player.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    mainGame: req.body.mainGame
  }).then(function () {
    console.log("New Player Added")
  }).catch(function (err) {
    console.log(err);
    res.json(err);
  });
});


//Creates a new challenge that the user sets up.
router.post("/api/challenges", function (req, res) {
  const challenge = {
    player_one: req.body.username,
    prize_pool: req.body.placebets,
    challenge_game: req.body.challenge_game,
    best_of: req.body.best_of,
    venue: req.body.location
  }
  db.Challenges.create(challenge).then(function (dbChallenge) {
    console.log(dbChallenge);
    res.json({ id: dbChallenge.insertId });
  });
});

//Updates the challenge to indicate if it was accepted or not
router.put("/api/challenges/:id", function (req, res) {

  console.log(req.body.challenge_accepted);
  db.Challenges.update({
    player_two: req.body.player_two,
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


//If one of the players wishes to not participate in the challenge, the decline button will delete the challenge from the table
router.delete("/api/challenges/:id", function (req, res) {
  db.Challenges.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbChallenges) {

    res.json(dbChallenges);
  });
});

//To display which challenges have been set and which have been accepted
router.get("/api/challenges/:condition", function (req, res) {
  console.log(typeof req.params.condition)
  db.Challenges.findAll({
    where: {
      challenge_accepted: req.params.condition
    }
  }).then(function (dbChallenges) {
    res.json(dbChallenges);
  })
});

//Logs out the user
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});

router.get("/api/user_data", function (req, res) {
  if (!req.user) { // The user is not logged in, send back an empty object 
    res.json({});
  } else {
    console.log(req.user);
    res.json({
      username: req.user.username,
      mainGame: req.user.mainGame
    });
  };
});

// Export routes for server.js to use.
module.exports = router;
