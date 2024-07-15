const { EXCHANGE_NAME, ROUTING_KEY } = require("../config/constants");
const { getSocketServerInstance } = require("../serverStore");
const { getRabbitMQChannel } = require("../utils/rabbit-mq");
const { handleCourseMessages } = require("./listeners/courseListener");
const { handleStreaksMessages } = require("./listeners/streakMessageListener");
const { handleProgressAchievementsMessages } = require("./listeners/achievement");

const startListeningForMessages = async () => {
    try {
        const channel = await getRabbitMQChannel();
        const io = getSocketServerInstance();
        const queue = "notifications_queue";
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, EXCHANGE_NAME, ROUTING_KEY.NOTIFICATION);

        channel.consume(queue, async (msg) => {
            if (msg.content) {
                const { type } = JSON.parse(msg.content.toString() || {});
                switch (type) {
                    case "course_added":
                    case "course_completed":
                        console.log("notified course_added 1");
                        await handleCourseMessages(msg, io);
                        break;
                    case "streak_achieved":
                        await handleStreaksMessages(msg, io);
                        break;
                    case "progress_made":
                    case "achievement_unlocked":
                        await handleProgressAchievementsMessages(msg, io);
                        break;
                    default:
                        break;
                }
            }
        }, { noAck: true });
    } catch (err) {
        console.error("Error in startListeningForMessages:", err);
    }
};

module.exports = { startListeningForMessages };
