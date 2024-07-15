const { UserStreaks } = require("../models");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");
const { Op } = require("sequelize");
const { ResponseDataSuccess } = require("../../utils/common-utils");

class UserStreakRepository {

    async handleLoggedInSession(userId) {
        console.log("here userId", userId)
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            const twoDaysAgo = new Date(today);
            twoDaysAgo.setDate(today.getDate() - 2);

            const streak = await UserStreaks.findOne({ where: { userId } });

            if (streak) {
                const lastLoginDate = new Date(streak.lastLogin);
                lastLoginDate.setHours(0, 0, 0, 0);

                if (lastLoginDate < yesterday) {
                    // Missed 1 day, reset streak
                    streak.streak = 1;
                } else if (lastLoginDate < twoDaysAgo) {
                    // Missed 2 or more days, reset streak
                    streak.streak = 0;
                } else if (lastLoginDate < today) {
                    // New login on a new day, increment streak
                    streak.streak += 1;
                }

                streak.lastLogin = new Date();
                await streak.save();
            } else {
                const lastLogin = new Date();
                this.create(userId, lastLogin)
            }


        } catch (err) {
            console.error("Error in handleLoggedInSession:", err);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }

    // Schedule a daily job to check and update streaks if necessary
    async checkStreaksDaily() {
        try {
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

            const streaks = await UserStreaks.findAll({
                where: {
                    lastLogin: {
                        [Op.lt]: twoDaysAgo
                    }
                }
            });

            for (const streak of streaks) {
                streak.streak = 0;
                await streak.save();
            }

        } catch (err) {
            console.error("Error in checkStreaksDaily:", err);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }

    }
    async create(userId, lastLogin) {
        try {
            const streakRecord = await UserStreaks.create({ userId, lastLogin });
            return streakRecord;
        } catch (error) {
            console.error("Error in checkStreaksDaily:", err);
            throw new APIError(
                err.message,
                err.name || "APIError",
                err.statusCode || STATUS_CODES.INTERNAL_ERROR,
                err.description || "Internal Server Error",
                err.isOperational
            );
        }
    }

    async update(userId, streak) {
        try {
            const [updatedRows] = await UserStreaks.update({ streak }, {
                where: { userId },
            });
            return updatedRows > 0;
        } catch (error) {
            console.log(`Error updating user streak record: ${error.message}`);
            throw new APIError(
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
