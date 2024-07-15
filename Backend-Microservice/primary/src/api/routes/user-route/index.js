const express = require('express');
const router = express.Router();

const learning = require("./learning");
const user = require("./user");

router.use("/learning", learning);
router.use("", user)


module.exports = router;