const Video = require('../models/Video');
const VideoDurationTracking = require('../models/VideoDurationTracking');


class VideoDurationRepository {
    async createOrUpdateVideoDuration({ userId, videoId, durationInSeconds }) {
        try {
            let videoDuration = await VideoDurationTracking.findOne({
                where: {
                    userId,
                    videoId
                }
            });

            if (!videoDuration) {
                videoDuration = await VideoDurationTracking.create({
                    userId,
                    videoId,
                    durationInSeconds
                });
            } else {
                await videoDuration.update({
                    durationInSeconds
                });
            }

            return videoDuration
        } catch (error) {
            console.error('Error creating or updating video duration:', error);
            throw new Error('Error creating or updating video duration');
        }
    }
    async getDurationByVideoIdUserId({ userId, videoId }) {
        try {
            const result = await VideoDurationTracking.findOne({
                where: {
                    userId,
                    videoId
                },
                attributes: ['durationInSeconds']
            });

            if (result) {
                return Number(result.durationInSeconds);
            } else {
                return 0;
            }
        } catch (error) {

        }
    }
}

module.exports = VideoDurationRepository;
