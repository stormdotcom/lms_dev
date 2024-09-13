const { ROUTING_KEY, EXCHANGE_NAME, EVENT_TYPES } = require("../../../config/constants")
const UserStreakRepository = require("../../../database/repository/streak-repository");
const VideoDurationService = require("../../../services/duration-service");
const { sendDurationAnalytics } = require("../../../services/publisher.js/analytics");
const UserProgressService = require("../../../services/user-progress-service");
const { getRabbitMQChannel } = require("../../../utils/rabbit-mq");

const express = require('express');
const router = express.Router();
const streakService = new UserStreakRepository();
const videoService = new VideoDurationService();
const vds = new VideoDurationService();
const ups = new UserProgressService();

router.post("/send", async (req, res, next) => {

    try {
        const { type, ...data } = req.body;
        const { id } = req.user;
        const channel = await getRabbitMQChannel();
        switch (type) {
            case EVENT_TYPES.LOGGED_IN_SESSION:
                const loginEvent = {
                    type,
                    data: { userId: id, activityType: type, ...data, activityTitle: "Logged In" }
                };
                streakService.handleLoggedInSession(id)
                channel.publish(
                    EXCHANGE_NAME,
                    ROUTING_KEY.LOGIN,
                    Buffer.from(JSON.stringify(loginEvent))
                );
                break;
            case EVENT_TYPES.LOGGED_OUT:
                const message = {
                    type,
                    data: { userId: id, activityType: type, ...data, activityTitle: "Logged Out" }
                };
                streakService.handleLoggedInSession(id)
                channel.publish(
                    EXCHANGE_NAME,
                    ROUTING_KEY.LOGIN,
                    Buffer.from(JSON.stringify(message))
                );
                break;
            case EVENT_TYPES.COURSE_VISITED:
                const visitEvent = {
                    type,
                    data: { userId: id, activityTitle: "You Visited '" + data.title + "' Course", activityType: type, timestamp: new Date(), ...data }
                };
                await
                    channel.publish(
                        EXCHANGE_NAME,
                        ROUTING_KEY.COURSE_VISIT,
                        Buffer.from(JSON.stringify(visitEvent))
                    );
                break;
            case EVENT_TYPES.SESSION_DURATION:
                const userId = id, durationInSeconds = data.durationInSeconds.toFixed(1);
                const videoId = parseInt(data.videoId, 10);
                const courseId = data.courseId;
                await vds.createOrUpdateVideoDuration({ userId, videoId, durationInSeconds, courseId });
            case EVENT_TYPES.PROGRESS_UPDATE:
                const progressUpdate = { userId: id, ...data }
                await ups.createOrUpdateVideoProgress(progressUpdate);
                break;
            case EVENT_TYPES.PAGE_VISIT_DURATION:
                const visitDuration = { userId: id, type, ...data };
                await sendDurationAnalytics(visitDuration);
                break;
            default:
                return res.status(400).json({ message: "Invalid event type" });
        }

        return res.status(200).json({ message: "Event processed" });
    } catch (err) {
        next(err);
    }
});



module.exports = router