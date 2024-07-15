const express = require("express");
const { PORT } = require("./config");
const { db } = require("./database");
const expressApp = require("./express-app");
const { connectRabbitMQ, getRabbitMQConnection } = require("./utils/rabbit-mq");

const startServer = async () => {
  const app = express();

  try {
    // Connect to the database
    await db.connectPG();
    console.log("Database connected");

    // Connect to RabbitMQ
    await connectRabbitMQ();
    console.log("RabbitMQ connected");

    // Initialize express app
    await expressApp(app);

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`[+] Primary server listening to port ${PORT} in ${process.env.NODE_ENV} mode`);
    });

    // Handle server errors
    server.on("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
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
