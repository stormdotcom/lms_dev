
const VideoDurationRepository = require('../database/repository/duration-repository');
const { APIError, STATUS_CODES } = require('../utils/app-errors');

class VideoDurationService {
    constructor() {
        this.repository = new VideoDurationRepository();
    }

    async createOrUpdateVideoDuration({ userId, videoId, durationInSeconds }) {
        try {
            const result = await this.repository.createOrUpdateVideoDuration({
                userId,
                videoId,
                durationInSeconds
            });
            return result;
        } catch (error) {
            console.error('Error creating or updating video duration:', error);
            throw new APIError('Error creating or updating video duration', STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async getDurationByVideoIdUserId(userId, videoId) {
        try {
            const result = await this.repository.getDurationByVideoIdUserId({
                userId,
                videoId
            });
            return result;
        } catch (error) {
            console.error('Error fetching video duration:', error);
            throw new APIError('Error fetching video duration', STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
}

module.exports = VideoDurationService;
