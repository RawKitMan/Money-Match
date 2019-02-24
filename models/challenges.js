module.exports = function (sequelize, DataTypes) {
    let Challenges = sequelize.define("Challenges", {
        player_one: {
            type: DataTypes.STRING,
            allowNull: false
        },
        player_two: {
            type: DataTypes.STRING,
            allowNull: true
        },
        challenge_accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },        
        prize_pool: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        challenge_time: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });
    return Challenges;
};