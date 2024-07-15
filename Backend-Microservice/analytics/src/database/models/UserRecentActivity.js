const { DataTypes, Model, Op } = require("sequelize");
const { sequelize } = require("../connection");
const User = require("./User");

class UserRecentActivity extends Model { }

UserRecentActivity.init(
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
        activityTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activityType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        lastUpdated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        readAccess: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }, options: {
            type: DataTypes.JSONB,
            defaultValue: {}
        }
    },
    {
        sequelize,
        modelName: "UserRecentActivity",
        tableName: "UserRecentActivities",
        timestamps: true,
    }
);
UserRecentActivity.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(UserRecentActivity, { foreignKey: 'userId' });
module.exports = UserRecentActivity;
