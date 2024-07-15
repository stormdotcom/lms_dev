const { ROUTING_KEY, EXCHANGE_NAME } = require("../config/constants");
const NotificationRepository = require("../database/repository/notification-repository");
const { getSocketServerInstance } = require("../serverStore");
const { handleCourseMessages } = require("../socketHandler/listeners/courseListener");
const { getRabbitMQChannel } = require("../utils/rabbit-mq");

const notification = new NotificationRepository();

const getUserNotifications = async () => {
    const io = getSocketServerInstance();
    const channel = await getRabbitMQChannel();
    const queue = 'get_notification-queue';
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, EXCHANGE_NAME, ROUTING_KEY.NOTIFICATION);
    channel.consume(queue, async (msg) => {
        if (msg.content) {
            const { type, userId, offset, limit, notificationId, ids = [] } = JSON.parse(msg.content.toString());
            console.log("0 ", type)
            let result;
            try {
                switch (type) {
                    case "get_notifications":
                        result = await notification.getNotificationByUserId(userId, offset, limit);
                        break;
                    case "update_notification":
                        result = await notification.hasReadNotificationById(notificationId);
                        break;
                    case "update_notification":
                        result = await notification.hasReadNotificationList(ids);
                        break;
                    case "course_added":
                    case "course_completed":
                        await handleCourseMessages(msg, io)
                    default:
                        throw new Error(`Unknown type: ${type}`);
                }
            } catch (error) {
                console.error(`Error processing ${type}:`, error);
                result = { error: error.message };
            }

            const replyTo = msg.properties.replyTo;
            const correlationId = msg.properties.correlationId;
            channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(result)), {
                correlationId: correlationId
            });
        }
    }, { noAck: true });
};

module.exports = { getUserNotifications };
