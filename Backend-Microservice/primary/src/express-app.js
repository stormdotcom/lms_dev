const express = require("express");
const cors = require("cors");
const path = require("path");

const { api, authApi, uploads } = require("./api");
const logger = require("morgan");
const errorHandler = require("./api/middlewares/errorHandler");
const { setUserFromToken, } = require("./api/middlewares/user");
const ErrorHandlerFinal = require("./utils/ErrorLogger");
const { BadRequestHandler } = require("./utils");
const BadRequestErrorHandler = require("./api/middlewares/errorHandler");
const authenticateToken = require("./api/middlewares/auth");


module.exports = async (app) => {
  app.use(cors());
  app.use(express.static('public'));
  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/public', express.static(path.join(__dirname, '../public')));

  //api
  app.get("/ping", (req, res) => res.status(200).json({ pong: true }));
  app.use('/v1', authApi);
  app.use('/media', authenticateToken, uploads);
  app.use('/', authenticateToken, api);
  app.get("/test", (req, res) => res.status(200).json({ result: "success from primary service" }));

  // error handling
  app.use(BadRequestErrorHandler);
  app.use(ErrorHandlerFinal)
};
