const express = require("express");
const http = require("http");

const { registerSocketServer } = require("./socketServer.js");
const { connectPG } = require("./database/connection.js");
const { startConsumer } = require("./consumers/index.js");


const startServer = async () => {
  const app = express();
  const server = http.createServer(app);


  try {
    await connectPG();
    console.log("Database connected");
    await registerSocketServer(server);
    await startConsumer();

    app.get("/", (req, res) => {
      res.send({ data: "Notification service is running" });
    });

    const PORT = process.env.PORT || 8004;
    server.listen(PORT, async () => {
      console.log(
        `Notification Service running on port ${PORT} ${process.env.NODE_ENV} Mode`
      );
    });

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      console.log("SIGTERM signal received: closing HTTP server");
      server.close(async () => {
        console.log("HTTP server closed");
        const connection = await getRabbitMQConnection();
        console.log("Closing RabbitMQ connection");
        await connection.close();
        process.exit(0);
      });
    });

  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

startServer();
