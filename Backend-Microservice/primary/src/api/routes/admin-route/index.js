const express = require('express');
const router = express.Router();



router.get('/test', async (req, res, next) => {
    try {
        res.status(200).json({ pong: true })
    } catch (error) {
        next(errors)
    }
});


module.exports = router;