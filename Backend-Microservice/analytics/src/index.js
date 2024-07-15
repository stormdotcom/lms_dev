const express = require("express");
const { PORT } = require("./config");
const { connectPG } = require("./database/connection");
const expressApp = require("./express-app");
const { connectRabbitMQ } = require("./utils/rabbit-mq");

const StartServer = async () => {
  const app = express();

  await connectPG();
  await connectRabbitMQ()
  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(
        `Analytics service listening to port ${PORT} in ${process.env.NODE_ENV} Mode`
      );
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
