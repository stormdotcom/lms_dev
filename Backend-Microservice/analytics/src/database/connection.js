const { Sequelize } = require("sequelize");
const { DB_URL } = require("../config");

const sequelize = new Sequelize(`${DB_URL}`, {
  dialect: "postgres",
  logging: false,
});

const connectPG = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true })
    console.log("Database connected...");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectPG };
