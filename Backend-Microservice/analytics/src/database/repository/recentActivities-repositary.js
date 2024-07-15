const { UserRecentActivity } = require("../models");
const {
    APIError,
    BadRequestError,
    STATUS_CODES,
} = require("../../utils/app-errors");
const { Op } = require("sequelize");


class UserRecentActivityRepo {

    async createDailyLoggedInActivity(data) {

        try {
            const isExists = await UserRecentActivity.findOne({
                where: {
                    activityType: data.activityType,
                    userId: data.userId
                }
            });

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only dates

            // If it exists, update the existing activity
            if (isExists) {
                const lastUpdated = new Date(isExists.lastUpdated);
                lastUpdated.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only dates
                if (!isExists.readAccess) {
                    isExists.readAccess = true;
                }
                // Check if the last update was before today
                if (lastUpdated < today) {
                    isExists.score += data.score;
                    isExists.lastUpdated = new Date();
                    await isExists.save();
                }
                return isExists;
            }

            const activity = await UserRecentActivity.create(data);
            return activity;
        } catch (err) {
            console.error("Error in createActivity:", err);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }
    async logUserLogout(userId) {
        console.log("here logUserLogout", userId)
        try {
            const session = await UserRecentActivity.findOne({
                where: {
                    userId,
                    activityType: 'login', // Assuming 'login' is the activityType for logged in sessions
                },
                order: [['createdAt', 'DESC']],
            });

            if (session) {
                session.readAccess = false;
                await session.save();
            }
        } catch (err) {
            console.error("Error in logUserLogout:", err);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }
    // Method to read all user activities
    async readAllActivities(userId) {
        try {
            const activities = await UserRecentActivity.findAll({
                where: { userId, readAccess: true },
                order: [['createdAt', 'DESC']]
            });
            return activities;
        } catch (err) {
            console.error("Error in readAllActivities:", err);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }
    async courseVisited(userId, data) {
        const { title, activityTitle, activityType, courseId } = data;
        try {

            const oneHourAgo = new Date();
            oneHourAgo.setMinutes(oneHourAgo.getMinutes() - 60);

            const existingActivity = await UserRecentActivity.findOne({
                where: {
                    userId,
                    activityType,
                    updatedAt: {
                        [Op.gt]: oneHourAgo
                    },
                    options: {
                        id: courseId
                    }
                }
            });
            if (!existingActivity) {
                await UserRecentActivity.create({
                    userId,
                    title,
                    activityType,
                    activityTitle,
                    readAccess: true,
                    options: { title, id: courseId }
                });
            }
            return null;
        } catch (err) {
            console.error("Error in readAllActivities:", err);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }
    async createVideoProgress(data) {
        const { title, activityTitle, activityType, courseId } = data;
        try {
            await UserRecentActivity.create({
                userId,
                title,
                activityType,
                activityTitle,
                readAccess: true,
                options: { title, id: courseId }
            });

            return activities;
        } catch (err) {
            console.error("Error in readAllActivities:", err);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }


}

module.exports = UserRecentActivityRepo;
