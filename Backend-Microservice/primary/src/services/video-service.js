
const VideoRepository = require("../database/repository/video-repository");
const { APIError, STATUS_CODES } = require("../utils/app-errors");

class VideoService {
    constructor() {
        this.repository = new VideoRepository();
    }

    async CreateVideo(videoInputs) {
        const {
            courseId,
            videoKey,
            title,
            duration,
            slug,
            videoNo,
            instructorId,
            uploadId,
            sourceUrl,
        } = videoInputs;

        try {
            const newVideo = await this.repository.createVideo({
                courseId,
                videoKey,
                title,
                duration,
                slug,
                videoNo,
                instructorId,
                uploadId,
                sourceUrl
            });

            return newVideo;
        } catch (err) {
            throw new APIError(err.message || "Something went wrong", STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async UpdateVideo(videoId, updateData) {
        try {
            const updatedVideo = await this.repository.updateVideo(videoId, updateData);
            return updatedVideo;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async UpdateAttachments(videoId, url) {
        try {
            const updatedVideo = await this.repository.updateAttachMent(videoId, url);
            return updatedVideo;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }


    async DeleteVideo(videoId) {
        try {
            const deleted = await this.repository.deleteVideo(videoId);
            return deleted;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async GetVideoById(videoId) {
        try {
            const video = await this.repository.getVideoById(videoId);
            return video;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async GetVideosByCourseIdAndSlug(courseId, slug) {
        try {
            const videos = await this.repository.getVideosByCourseIdAndSlug(courseId, slug);
            return videos;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async ListVideos(courseId) {
        try {
            const videos = await this.repository.listVideos(courseId);
            return videos;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }
    async ListVideoPlayList(courseId) {
        try {
            const videos = await this.repository.listVideoPlayList(courseId);
            return videos;
        } catch (err) {
            throw new APIError(err.message, STATUS_CODES.INTERNAL_ERROR, true);
        }
    }

    async getAllCourseByCriteria(criteria, properties = []) {
        try {
            const videos = await this.repository.getVideos(criteria, properties);
            const formattedVideos = videos.map(item => {
                const videoData = item.dataValues;
                if (videoData.options && videoData.options.meta && videoData.options.meta.videoKey) {
                    videoData.videoKey = videoData.options.meta.videoKey;
                    videoData.videoId = videoData.id
                }
                delete videoData.options;
                return videoData;
            });

            return formattedVideos;
        } catch (error) {
            console.error('Error listing videos:', error);
            throw new Error('Error listing videos');
        }
    }
}

module.exports = VideoService;
