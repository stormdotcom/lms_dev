const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../connection");
const User = require("./User");

class Course extends Model { }

Course.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.FLOAT,
        },
        language: {
            type: DataTypes.STRING
        },
        instructorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        thumbnailUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        outcome: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        reviews: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: [],
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        publish: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        options: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: {},
        },
    },
    {
        sequelize,
        modelName: "Course",
        tableName: "Courses",
        timestamps: true,
        indexes: [
            {
                fields: ['title'],
            },
            // {
            //   fields: ['description'],
            // },
        ]
    }
);
Course.belongsTo(User, { as: 'instructor' });
module.exports = Course;

