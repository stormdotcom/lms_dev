const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const logger = require("morgan");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");
const authenticateToken = require("./middlewares/auth");
const apiLimiter = require("./middlewares/rateLimiter");
const proxy = require("express-http-proxy");
const fileUploadProxy = require("./middlewares/proxy");
const { PORT } = require("./config");

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(logger("dev"));


// app.use(apiLimiter);
app.get("/api/ping", (req, res) => res.status(200).json({ pong: true }));
app.use("/api/auth", proxy("http://localhost:8001/auth"));
app.use(authenticateToken);

app.use("/api/service", proxy("http://localhost:8001"));
app.use("/api/events", proxy("http://localhost:8001"));
app.use("/api/uploads", fileUploadProxy);
app.use("/analytics", proxy("http://localhost:8002"));
app.use("/api/notifications", proxy("http://localhost:8003"));

app.get("/test", (req, res) => res.status(200).json({ result: "success" }));
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    "Gateway server Listening to Port 8000 in",
    process.env.NODE_ENV,
    "mode"
  );
});
