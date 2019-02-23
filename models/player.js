module.exports = function (sequelize, DataTypes) {
  let Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mainGame: {
      type: DataTypes.STRING
    }
  });

  Player.prototype.validPassword = function(password) { 
    return bcrypt.compareSync(password, this.password); 
  };

  Player.addHook("beforeCreate", function(player) { 
    player.password = bcrypt.hashSync(player.password, bcrypt.genSaltSync(10), null); 
  });


  return Player;
};