const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../../config");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Access token is missing", errorCode: 9401 });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is missing", errorCode: 9401 });
    }

    jwt.verify(token, JWT_ACCESS_SECRET, (err, user) => {

        if (err) {
            return res.status(401).json({ message: "Invalid access token", errorCode: 9000 });
        }
        const decodedToken = user;
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = decodedToken.exp - currentTime;

        if (timeRemaining <= 30 * 60) {
            return res.status(401).json({ message: "Access token is about to expire", errorCode: 9000 });
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,

        };

        next();
    });
};

module.exports = authenticateToken;
