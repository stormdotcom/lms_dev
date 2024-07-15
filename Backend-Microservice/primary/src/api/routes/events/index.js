const { ROUTING_KEY, EXCHANGE_NAME, EVENT_TYPES } = require("../../../config/constants")
const UserStreakRepository = require("../../../database/repository/streak-repository");
const VideoDurationService = require("../../../services/duration-service");
const { getRabbitMQChannel } = require("../../../utils/rabbit-mq");

const express = require('express');
const router = express.Router();
const streakService = new UserStreakRepository();
const videoService = new VideoDurationService();
const vds = new VideoDurationService()
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
                console.log("here", visitEvent);
                await
                    channel.publish(
                        EXCHANGE_NAME,
                        ROUTING_KEY.COURSE_VISIT,
                        Buffer.from(JSON.stringify(visitEvent))
                    );
                break;
            case EVENT_TYPES.PROGRESS_UPDATE:
                const userId = id, durationInSeconds = data.durationInSeconds.toFixed(1);
                const videoId = parseInt(data.videoId, 10);

                const progressEvent = {
                    type,
                    data: { ...data, userId: id, videoId }
                };

                await vds.createOrUpdateVideoDuration({ userId, videoId, durationInSeconds });

                const { duration } = data;
                if (duration > 3600) {
                    channel.publish(
                        EXCHANGE_NAME,
                        ROUTING_KEY.COURSE_VISIT,
                        Buffer.from(JSON.stringify({ ...progressEvent, activityTitle: "Views " + data.courseTitle + "course for 60 minutes" }))
                    );
                }

                break;
            case EVENT_TYPES.SESSION_DURATION:
                // Handle session duration logic here
                const sessionEvent = {
                    type,
                    data: { userId: id, sessionStart: data.session_start, sessionEnd: data.session_end, sessionDuration: data.duration }
                };
                channel.publish(
                    EXCHANGE_NAME,
                    ROUTING_KEY.SESSION,
                    Buffer.from(JSON.stringify(sessionEvent))
                );
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