var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the players in the database
  app.get("/api/players", function(req, res) {

  });

  // POST route for saving a new player. You can create a player using the data on req.body
  app.post("/api/players", function(req, res) {

  });

  // DELETE route for deleting players. You can access the player's id in req.params.id
  app.delete("/api/players/:id", function(req, res) {

  });

  // PUT route for updating players. The updated player will be available in req.body
  app.put("/api/players", function(req, res) {

  });
};