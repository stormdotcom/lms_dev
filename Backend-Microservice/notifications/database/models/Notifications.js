const { Sequelize, DataTypes, Model } = require("sequelize");
const { NOTIFICATIONS_ENUM } = require("../../config/constants");
const User = require("./User");
const { sequelize } = require("../connection")

class Notifications extends Model { }

Notifications.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hasRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: NOTIFICATIONS_ENUM,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    expiresAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL \'14 days\''),
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "Notifications",
    timestamps: true,
  }
);

module.exports = Notifications;
