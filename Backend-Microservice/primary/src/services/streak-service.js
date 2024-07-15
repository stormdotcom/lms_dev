const { APIError, STATUS_CODES } = require("../utils/app-errors");
const UserStreakRepository = require("../database/repository/streak-repository");

class UserStreakService {
    constructor() {
        this.userStreakRepository = new UserStreakRepository();
    }

    async getCurrentStreak(userId) {
        try {
            const streak = await this.userStreakRepository.getStreak(userId);
            return streak;
        } catch (error) {
            console.error("Error in getCurrentStreak:", error);
            throw new APIError(
                "Error fetching current streak",
                error.name || "APIError",
                error.statusCode || STATUS_CODES.INTERNAL_ERROR,
                error.description || "Internal Server Error",
                error.isOperational
            );
        }
    }

    async updateStreak(userId, incrementBy) {
        try {
            const currentStreak = await this.userStreakRepository.getStreak(userId);
            const updatedStreak = currentStreak + incrementBy;

            await this.userStreakRepository.update(userId, updatedStreak);

            return updatedStreak;
        } catch (error) {
            console.error("Error in updateStreak:", error);
            throw new APIError(
                "Error updating streak",
                error.name || "APIError",
                error.statusCode || STATUS_CODES.INTERNAL_ERROR,
                error.description || "Internal Server Error",
                error.isOperational
            );
        }
    }
}

module.exports = UserStreakService;
