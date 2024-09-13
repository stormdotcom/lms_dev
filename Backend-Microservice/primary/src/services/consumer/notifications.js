// utils/rabbitmqPublisher.js

const { v4: uuidv4 } = require('uuid');



const getRecentNotifications = async (userId) => {
    const message = { type: "get_recent_notification", userId };
    return publishMessage(message, ROUTING_KEY.ANALYTICS);
};

const getNotifications = async (userId, offset, limit) => {
    const message = { type: "get_notifications", userId, offset, limit };
    return publishMessage(message, ROUTING_KEY.NOTIFICATION);
};

const updateNotification = async (notificationId) => {
    const message = { type: "update_notification", notificationId };
    return publishMessage(message, ROUTING_KEY.NOTIFICATION);
};

const updateNotifications = async (ids) => {
    const message = { type: "update_notifications", ids };
    return publishMessage(message, ROUTING_KEY.NOTIFICATION);
};

module.exports = {
    getRecentNotifications,
    getNotifications,
    updateNotification,
    updateNotifications,
};
