//Sequelize model for game venues.
module.exports = function (sequelize, DataTypes) {
    let Venue = sequelize.define("Venue", {
      location: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      
    });
    return Venue;
  };