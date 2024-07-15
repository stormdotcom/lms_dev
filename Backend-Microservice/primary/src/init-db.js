const { Sequelize } = require("sequelize");
const sequelize = require("./database/connection");
const { exec } = require("child_process");
const { DB_URL } = require("./config");

// Import models
require("./database/models/User"); // Ensure this path is correct

const dbName = "lms";

async function createDatabase() {
  try {
    const sequelizeTemp = new Sequelize(DB_URL, {
      dialect: "postgres",
      logging: console.log,
    });

    await sequelizeTemp.query(`CREATE DATABASE ${dbName};`);
    console.log(`Database ${dbName} created`);
  } catch (error) {
    if (error.original && error.original.code === "42P04") {
      console.log(`Database ${dbName} already exists`);
    } else {
      console.error("Error creating database:", error);
    }
  }
}

async function init() {
  await createDatabase();
  // await syncModels();
}

init();
