const { EXCHANGE_NAME, ROUTING_KEY, EVENT_TYPES } = require("../../config/constants");
const UserRecentActivityRepo = require("../../database/repository/recentActivities-repositary");
const { getRabbitMQChannel } = require("../../utils/rabbit-mq");
const axios = require("axios");
const userRecentActivity = new UserRecentActivityRepo()

const consumeLearningStats = async () => {
    const channel = await getRabbitMQChannel();
    const queue = ''; // i have doubt in here
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, EXCHANGE_NAME, ROUTING_KEY.COURSE_VISIT);

    channel.consume(queue, async (msg) => {
        if (msg.content) {
            const { type, data } = JSON.parse(msg.content.toString());
            const { userId, ...rest } = data

            try {
                const data = { userId, ...rest };
                if (type === EVENT_TYPES.COURSE_VISITED) {
                    await userRecentActivity.courseVisited(userId, rest);
                } else if (type === EVENT_TYPES.PROGRESS_UPDATE) {
                    await userRecentActivity.createVideoProgress(data);
                }

            } catch (error) {
                console.error('Error processing progress update:', error);
            }
        }
    }, { noAck: true });
};



module.exports = {
    consumeLearningStats
};
