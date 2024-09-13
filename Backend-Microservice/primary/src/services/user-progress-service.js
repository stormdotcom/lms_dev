
const UserProgressRepository = require('../database/repository/user-progress-repository');
const { APIError, STATUS_CODES } = require('../utils/app-errors');

class UserProgressService {
    constructor() {
        this.repository = new UserProgressRepository();
    }

    async createOrUpdateVideoProgress(data) {

        const { userId, videoId, courseId, sessionEndDuration, videoDuration } = data;
        try {
            let progress = parseFloat(((sessionEndDuration / videoDuration) * 100).toFixed(3));
            progress = progress >= 100 ? 100 : progress
            progress = (!isNaN(progress) && typeof progress === 'number') ? progress : 0;
            const result = await this.repository.createUpdateUserProgress({
                userId,
                videoId,
                courseId,
                progress

            });
            return result;
        } catch (error) {
            console.error('Error creating or updating video progress:', error);
            throw new APIError('Error creating or updating video progress', STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async getCourseOverallProgress(userId) {
        try {
            const result = await this.repository.getCourseOverallProgress(userId);
            return result;
        } catch (error) {
            console.error('Error fetching video progress:', error);
            throw new APIError('Error fetching video progress', STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
    async getCourseOverallProgressByCourse(userId, courseId) {
        try {
            const result = await this.repository.getCourseOverallProgress({
                userId,
                courseId
            });
            return result;
        } catch (error) {
            console.error('Error fetching video progress:', error);
            throw new APIError('Error fetching video progress', STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
    async getLastAccessedThree(userId) {
        try {
            const result = await this.repository.getLastAccessedThree(userId);
            return result;
        } catch (error) {
            console.error('Error fetching video progress:', error);
            throw new APIError('Error fetching video progress', STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
}

module.exports = UserProgressService;
