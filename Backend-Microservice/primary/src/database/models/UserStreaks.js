const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../connection");

class UserStreak extends Model { }

UserStreak.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        streak: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "UserStreak",
        tableName: "UserStreaks",
        timestamps: true,
    }
);

module.exports = UserStreak;
