const { UserStreaks } = require("../models");

const { Op } = require("sequelize");
const { ResponseDataSuccess } = require("../../utils/common-utils");

class UserStreakRepository {

    async update(userId, streak) {
        try {
            const [updatedRows] = await UserStreaks.update({ streak }, {
                where: { userId },
            });
            return updatedRows > 0;
        } catch (error) {
            console.log(`Error updating user streak record: ${error.message}`);
            throw new ApiError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }

    async getStreak(userId) {
        try {
            const streakRecord = await UserStreaks.findOne({
                where: { userId },
                attributes: ['streak'],
            });
            const data = streakRecord ? streakRecord.streak : 0;
            ResponseDataSuccess(data);
        } catch (error) {
            console.log(`Error getting user streak record: ${error.message}`);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }

    async getLastLogin(userId) {
        try {
            const streakRecord = await UserStreaks.findOne({
                where: { userId },
                attributes: ['lastLogin'],
            });
            return streakRecord ? streakRecord.lastLogin : null; // Return null if no streak record found
        } catch (error) {
            console.log(`Error getFetching last logged in record: ${error.message}`);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }
    // Run the job every day at midnight
    scheduleDailyStreakCheck() {
        setInterval(this.checkStreaksDaily, 24 * 60 * 60 * 1000); // Runs once a day
    }
}

module.exports = UserStreakRepository;
