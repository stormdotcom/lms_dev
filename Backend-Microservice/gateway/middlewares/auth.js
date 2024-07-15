const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../config")
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];


    if (!authHeader) {

        return res.status(401).json({ message: "Access token is missing", errorCode: 9401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {

        return res.status(401).json({ message: "Access token is missing", errorCode: 9401 });
    }

    next();
};

module.exports = authenticateToken;
