const { EXCHANGE_NAME, ROUTING_KEY, EVENT_TYPES } = require("../../config/constants");
const UserRecentActivityRepo = require("../../database/repository/recentActivities-repositary");
const { getRabbitMQChannel } = require("../../utils/rabbit-mq");
const axios = require("axios");
const userRecentActivity = new UserRecentActivityRepo()

const consumeLoginStats = async () => {
    const channel = await getRabbitMQChannel();
    const queue = ''; // i have doubt in here
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, EXCHANGE_NAME, ROUTING_KEY.LOGIN);

    channel.consume(queue, async (msg) => {
        if (msg.content) {
            const { type, data } = JSON.parse(msg.content.toString());
            const { userId, ...rest } = data

            try {
                // Update progress in the database
                const data = { userId, score: 1, ...rest };
                if (type === EVENT_TYPES.LOGGED_OUT) {
                    await userRecentActivity.logUserLogout(userId);
                } else if (type === EVENT_TYPES.LOGGED_IN_SESSION) {
                    await userRecentActivity.createDailyLoggedInActivity(data);
                }

            } catch (error) {
                console.error('Error processing progress update:', error);
            }
        }
    }, { noAck: true });
};

const getUserRecentActivity = async () => {
    const channel = await getRabbitMQChannel();
    const queue = 'get_recent_activities-queue';
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, EXCHANGE_NAME, ROUTING_KEY.ANALYTICS);
    channel.consume(queue, async (msg) => {
        if (msg.content) {
            const { type, userId } = JSON.parse(msg.content.toString());
            const replyTo = msg.properties.replyTo;
            const correlationId = msg.properties.correlationId;
            try {
                const activities = await userRecentActivity.readAllActivities(userId);
                channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(activities)), {
                    correlationId: correlationId
                });
            } catch (error) {
                console.error('Error processing progress update:', error);
            }
        }
    }, { noAck: true });
};

module.exports = {
    consumeLoginStats,
    getUserRecentActivity
};
