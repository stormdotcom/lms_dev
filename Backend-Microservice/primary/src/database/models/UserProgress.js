const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../connection");

class UserProgress extends Model { }

UserProgress.init(
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
                key: "id"
            }
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Courses",
                key: "id"
            }
        },
        videoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Videos",
                key: "id"
            }
        },
        progress: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
        },
        lastAccessed: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "UserProgress",
        tableName: "UserProgress",
        timestamps: true,
    }
);

module.exports = UserProgress;
