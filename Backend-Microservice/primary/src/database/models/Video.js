const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../connection");

class Video extends Model { }

Video.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Courses",
                key: "id"
            }
        },
        stream: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        sourceUrl: {
            type: DataTypes.STRING,
        },
        attachments: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        thumbnailUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        dislikes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        commentsEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        options: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {},
        },
    },
    {
        sequelize,
        modelName: "Video",
        tableName: "Videos",
        timestamps: true,
    }
);

module.exports = Video;
