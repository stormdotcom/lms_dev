const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../connection");

class Enrollment extends Model { }

Enrollment.init(
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
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "not started", // can be "not started", "in progress", "completed"
        },
        progress: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Enrollment",
        tableName: "Enrollments",
        timestamps: true,
    }
);

module.exports = Enrollment;
