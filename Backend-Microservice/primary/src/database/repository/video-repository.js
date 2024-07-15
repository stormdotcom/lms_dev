const { sequelize } = require('../connection');
const Video = require('../models/Video');

class VideoRepository {
    async createVideo({
        title,
        courseId,
        videoKey,
        videoId,
        duration,
        slug,
        videoNo,
        instructorId,
        uploadId,
        sourceUrl

    }) {
        try {
            const video = await Video.create({
                title,
                courseId,
                duration,
                sourceUrl,
                author: instructorId,
                options: {
                    meta: {
                        uploadId,
                        videoKey,
                        videoId,
                        slug,
                        videoNo,
                    }
                }
            });
            return video;
        } catch (error) {
            console.error('Error creating video entry:', error);
            throw new Error('Error creating video entry');
        }
    }

    async getVideoById(videoId) {
        try {
            const video = await Video.findByPk(videoId);
            return video.dataValues;
        } catch (error) {
            console.error('Error fetching video by ID:', error);
            throw new Error('Error fetching video by ID');
        }
    }

    async getVideos(criteria, properties = []) {

        try {
            const video = await Video.findAll({
                where: criteria,
                attributes: properties
            });
            return video;
        } catch (error) {
            console.error('Error fetching video by ID:', error);
            throw new Error('Error fetching video by ID');
        }
    }

    async updateVideo(videoId, updates) {
        try {
            const video = await Video.findByPk(videoId);
            if (!video) {
                throw new Error('Video not found');
            }

            const updatedVideo = await video.update(updates);
            return updatedVideo.dataValues;
        } catch (error) {
            console.error('Error updating video:', error);
            throw new Error('Error updating video');
        }
    }

    async updateAttachMent(videoId, url) {
        try {
            const video = await Video.findByPk(videoId);
            if (!video) {
                throw new Error('Video not found');
            }
            const updatedAttachments = video.attachments ? [...video.attachments, url] : [url];
            video.attachments = updatedAttachments;
            await video.save();
            return video;
        } catch (error) {
            console.error('Error updating video:', error);
            throw new Error('Error updating video');
        }
    }

    async deleteVideo(videoId) {
        try {
            const video = await Video.findByPk(videoId);
            if (!video) {
                throw new Error('Video not found');
            }

            await video.destroy();
            return true;
        } catch (error) {
            console.error('Error deleting video:', error);
            throw new Error('Error deleting video');
        }
    }

    async listVideos(courseId) {
        try {
            const videos = await Video.findAll({ where: { courseId } });
            return videos;
        } catch (error) {
            console.error('Error listing videos:', error);
            throw new Error('Error listing videos');
        }
    }
    async listVideoPlayList(courseId) {
        try {
            const videos = await sequelize.query(
                `SELECT id, title, duration, options->'meta'->>'videoNo' AS videoNo
                 FROM "Videos"
                 WHERE "courseId" = :courseId
                 ORDER BY options->'meta'->>'videoNo' ASC`,
                {
                    replacements: { courseId },
                    type: sequelize.QueryTypes.SELECT
                }
            );
            return videos;
        } catch (error) {
            console.error('Error listing videos:', error);
            throw new Error('Error listing videos');
        }
    }
    async getVideosByCourseIdAndSlug(courseId, slug) {
        try {
            const videos = await Video.findAll({
                where: {
                    courseId
                },
                order: [['options.meta.VideoNo', 'ASC']]
            });
            return videos;
        } catch (error) {
            console.error('Error fetching videos by courseId and slug:', error);
            throw new Error('Error fetching videos by courseId and slug');
        }
    }

}

module.exports = VideoRepository;
