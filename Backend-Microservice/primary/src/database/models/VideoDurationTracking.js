const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../connection");

class VideoDurationTracking extends Model { }

VideoDurationTracking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        videoId: {
            type: DataTypes.INTEGER // Adjust data type based on your video ID structure
        },
        durationInSeconds: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "VideoDurationTracking",
        tableName: "VideoDurationTracking",
        timestamps: true,
    }
);

module.exports = VideoDurationTracking;
