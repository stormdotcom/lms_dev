const express = require('express');
const router = express.Router();

const course = require("./course");
const instructor = require("./instructor");

router.use("", instructor)
router.use("/course", course)
module.exports = router;