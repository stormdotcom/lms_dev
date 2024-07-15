const NotificationRepository = require("../../database/repository/notification-repository");
const { NOTIFICATIONS_ENUM } = require("../../config/constants");

const handleCourseMessages = async (msg, io) => {
    const notifications = new NotificationRepository();
    const { type = "", data = {} } = JSON.parse(msg.content.toString() || {});

    switch (type) {
        case "course_added":
            await notifications.createNotification(data, io);
            console.log("notified handleCourseMessages", type);
            break;
        case "course_completed":
            console.log("notified course_completed");
            io.emit('course_completed', { title: "Congratulations", message: `${data} Completed` });
            break;
        default:
            break;
    }
};

module.exports = { handleCourseMessages };
