const express = require("express");
const cors = require("cors");
const { user } = require("./api");
const HandleErrors = require("./utils/error-handler");
const logger = require("morgan");
const { startConsumer } = require("./services");
module.exports = async (app) => {
  app.use(logger("dev"));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  user(app);
  startConsumer()
  // error handling
  app.use(HandleErrors);
};
