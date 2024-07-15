const dotenv = require("dotenv");
const path = require("path");

const env = process.env.NODE_ENV || "dev";
const envFile = env === "prod" ? ".env" : `.env.${env}`;
const envPath = path.resolve(__dirname, "..", envFile);

console.log("Loading environment variables from:", envFile);
dotenv.config({ path: envFile });

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_URL:", process.env.DB_URL);

module.exports = {
  PORT: process.env.PORT || 8001,
  DB_URL: process.env.DB_URL,
  JWT_ACCESS_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  RABBIT_MQ_URL: process.env.RABBIT_MQ_SERVER
};
