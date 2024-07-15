
const UserService = require("../../../services/user-service");
const UserAuth = require("../../middlewares/auth");
const jwt = require("jsonwebtoken");
const express = require('express');
const { signValidation, signUpValidation } = require("../../../utils/validator/auth-validator");
const router = express.Router();


const service = new UserService();
router.post("/sign-up", signUpValidation, async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body
    try {
        const data = await service.SignUp({ email, password, firstName, lastName });
        return res.json(data);

    } catch (err) {
        next(err);
    }
});

router.post("/sign-in", signValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const data = await service.SignIn({ email, password });

        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.post("/verify-email", UserAuth, async (req, res, next) => {
    try {
        const { userId } = req.body;
        const { data } = await service.VerifyEmail(userId);
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get("/refresh-token", async (req, res, next) => {
    try {
        const headerRefreshToken = req.headers["authorization"];
        if (!headerRefreshToken) {
            return res.status(401).json({ message: "Access token is missing", errorCode: 9401 });
        }
        const token = headerRefreshToken.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Refresh token not found', errorCode: 9401 });
        }
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid refresh token', errorCode: 9400 });
            }
        })
        const data = await service.RefreshTokens(token);

        return res.json(data);

    } catch (err) {
        next(err);
    }
});


module.exports = router;
