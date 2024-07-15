const express = require('express');
const router = express.Router();

const userRoutes = require('./user-route');
const adminRoutes = require('./admin-route');
const eventsRoutes = require('./events');
const instructorRoutes = require('./instructor-route/index');
const uploads = require("./upload");


router.use('/user', userRoutes);
router.use('/instructor', instructorRoutes);
router.use('/admin', adminRoutes);
router.use('/web', eventsRoutes);
router.use('/media', uploads);

module.exports = router;