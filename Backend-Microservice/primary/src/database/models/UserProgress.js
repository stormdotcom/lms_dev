const { DataTypes, Model } = require("sequelize");
const  sequelize = require("../../utils/sequelizeCache");

const User = require("./User");
const Course = require("./Course");
const Video = require("./Video");

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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        typeOfProgress: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "course",
        }
    },
    {
        sequelize,
        modelName: "UserProgress",
        tableName: "UserProgress",
        timestamps: true,
    }
);

UserProgress.belongsTo(User, { foreignKey: "userId" });
UserProgress.belongsTo(Course, { foreignKey: "courseId" });
UserProgress.belongsTo(Video, { foreignKey: "videoId" });

module.exports = UserProgress;
