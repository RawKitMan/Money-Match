module.exports = function (sequelize, DataTypes) {
  let Player = sequelize.define("Player", {
    name: DataTypes.STRING,    
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    mainGame: DataTypes.STRING
  });
  return Player;
};