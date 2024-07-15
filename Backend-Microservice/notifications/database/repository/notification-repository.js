
const { Notifications } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");
const User = require("../models/User");
const { courseAddedHandler } = require("../../socketHandler/notificationHandlers");
const { NOTIFICATIONS_ENUM } = require("../../config/constants");

class NotificationRepository {

  async createNotification(data, io) {
    console.log("1")
    try {
      const { title } = data;
      const newData = { message: title + " ", title: "New Course Added", type: NOTIFICATIONS_ENUM[2], hasRead: false };
      const users = await User.findAll({
        where: { role: "user" },
        attributes: ["id"]
      })
      const userIds = users.map((item) => item.dataValues.id);
      const notificationPromises = userIds.map(async (userId) => {
        const entry = {
          ...newData,
          userId: userId
        };
        await Notifications.create(entry);
      });
      await Promise.all(notificationPromises);
      courseAddedHandler(io, userIds, newData);

      return true;
    } catch (err) {
      throw new APIError(
        err.message,
        err.name || "APIError",
        err.statusCode || STATUS_CODES.INTERNAL_ERROR,
        err.description || "Unable to create notification"
      );
    }
  }

  async getNotificationByUserId(userId, offset = 0, limit = 10) {
    try {
      const notifications = await Notifications.findAll({
        where: { userId },
        offset: offset,
        limit: limit + 1,
        order: [['createdAt', 'DESC']],
      });


      const hasMore = notifications.length > limit;

      const limitedNotifications = hasMore ? notifications.slice(0, limit) : notifications;

      return { notifications: limitedNotifications, hasMore };
    } catch (err) {
      throw new APIError(
        err.message,
        err.name || "APIError",
        err.statusCode || STATUS_CODES.INTERNAL_ERROR,
        err.description || "Unable to retrieve notifications"
      );
    }
  }

  async hasReadNotificationById(notificationId) {
    try {
      const notification = await Notifications.findByPk(notificationId);
      if (!notification) {
        throw new BadRequestError("Notification not found");
      }
      notification.hasRead = true;
      await notification.save();
      return notification;
    } catch (err) {
      throw new APIError(
        err.message,
        err.name || "APIError",
        err.statusCode || STATUS_CODES.INTERNAL_ERROR,
        err.description || "Unable to mark notification as read"
      );
    }
  }

  async hasReadNotificationList(notificationIds) {
    try {
      const notifications = await Notifications.update(
        { hasRead: true },
        {
          where: {
            id: notificationIds,
          },
        }
      );
      return notifications;
    } catch (err) {
      throw new APIError(
        err.message,
        err.name || "APIError",
        err.statusCode || STATUS_CODES.INTERNAL_ERROR,
        err.description || "Unable to mark notifications as read"
      );
    }
  }
}

module.exports = NotificationRepository;
