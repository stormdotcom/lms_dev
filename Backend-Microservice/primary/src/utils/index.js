const _ = require('lodash')
const jwt = require("jsonwebtoken");
const { createLogger, format, transports } = require('winston');

const { JWT_ACCESS_SECRET } = require("../config");

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.headers["Authorization"];
    const payload = await jwt.verify(signature.split(" ")[1], JWT_ACCESS_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};



module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Empty Data Returned!");
  }
};


module.exports.FormateUserData = (dataValues) => {
  if (dataValues) {
    const newData = _.omit(dataValues, ["role", "status", "isVerified", "id", "password", "createdAt", "updatedAt"]);
    return newData;
  } else {
    throw new Error("Empty Data Returned!");
  }
};

module.exports.FormateUserDataAuth = (dataValues) => {

  if (dataValues) {
    const newData = _.omit(dataValues, ["status", , "id", "password", "createdAt", "updatedAt"]);
    return newData;
  } else {
    throw new Error("Empty Data Returned!");
  }
};

module.exports.BadRequestHandler = (err, req, res, next) => {
  res.status(400); // Bad Request
  console.log(err);
  res.json({ errorTitle: "Bad Request", message: err.message || 'An error has occurred.' });
  next();
};


const { NODE_ENV } = process.env;


module.exports.Logger = (err) => {
  const logger = createLogger({
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' })
    ],
  });

  if (NODE_ENV !== 'prod') {
    logger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }));
  }
};
