const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../connection");
const bcrypt = require("bcrypt");
const { USER_TYPES } = require("../../config/constants");

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: USER_TYPES.USER,
    },
    profileAvatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    options: {
      type: DataTypes.JSONB, // insert bio {}
      allowNull: true,
      defaultValue: {},
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = User;
