
const express = require("express");
const CourseService = require("../../../services/course-service");
const VideoRepository = require("../../../database/repository/video-repository");
const { createCourseValidator } = require("../../../utils/validator/instructor-validator");
const VideoService = require("../../../services/video-service");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client, BUCKET_NAME, deleteS3Objects } = require("../../../utils/s3Util");
const { extractS3KeyFromUrl } = require("../../../utils/common-utils");
const { getRabbitMQChannel } = require("../../../utils/rabbit-mq");
const { EXCHANGE_NAME, ROUTING_KEY } = require("../../../config/constants");

const router = express.Router();

const courseService = new CourseService()
const videoService = new VideoRepository();

const serviceVideo = new VideoService();

router.get("/all", async (req, res, next) => {

    const instructorId = req.user.id;
    const pageNo = parseInt(req.query.pageNo) || 1;
    const pageSize = parseInt(req.query.pageSize) || 7;
    const limit = parseInt(req.query.limit) || 10;

    const pagination = { pageNo, pageSize, limit }
    try {
        const data = await courseService.getCoursersByInstructor(instructorId, pagination)

        res.status(200).json(data)
    }
    catch (err) {
        next(err);
    }
});

router.post("/create", createCourseValidator, async (req, res, next) => {
    const instructorId = req.user.id;
    const data = req.body;

    try {
        const result = await courseService.createCourse(instructorId, data)

        res.status(200).json({ data: result })
    }
    catch (err) {
        next(err);
    }
})

router.get("/details/:slug", async (req, res, next) => {
    const slug = req.params.slug;
    try {
        const course = await courseService.getCourseBySlug(slug)
        const criteria = { courseId: course.id }
        const properties = ['id', 'title', 'sourceUrl', "attachments", "options", "duration"];
        const videos = await serviceVideo.getAllCourseByCriteria(criteria, properties)
        const result = { ...course, lectures: videos || [] }
        res.status(200).json({ data: result })
    }
    catch (err) {
        next(err);
    }
})

router.get("/details/:id", async (req, res, next) => {

    const courseId = req.params.id;

    try {
        const data = await courseService.getCourseById(courseId)

        res.status(200).json({ data })
    }
    catch (err) {
        next(err);
    }
});

router.put("/details/:id", async (req, res, next) => {

    const courseId = req.params.id;
    const userInput = req.body

    try {
        const data = await courseService.updateCourseById(courseId, userInput)

        res.status(200).json({ data })
    }
    catch (err) {
        next(err);
    }
});

router.delete("/details/:id", async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const course = await courseService.getCourseById(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const allKeys = [];

        // Collect thumbnail key if present and starts with https
        if (course.thumbnailUrl && course.thumbnailUrl.startsWith("https://")) {
            const thumbnailKey = extractS3KeyFromUrl(course.thumbnailUrl);
            allKeys.push({ Key: thumbnailKey });
        }

        const videos = await videoService.listVideos(courseId);

        if (videos.length > 0) {
            await Promise.all(videos.map(async (video) => {
                // Collect attachment keys if present
                if (video.attachments && Array.isArray(video.attachments)) {
                    video.attachments.forEach(attachment => {
                        if (attachment.startsWith("https://")) {
                            const attachmentKey = extractS3KeyFromUrl(attachment);
                            allKeys.push({ Key: attachmentKey });
                        }
                    });
                }

                if (video.options && video.options.meta && video.options.meta.videoKey) {
                    const videoKey = video.options.meta.videoKey;
                    allKeys.push({ Key: videoKey });
                }

                await videoService.deleteVideo(video.id);
            }));
        }

        await deleteS3Objects(allKeys);
        const data = await courseService.deleteCourse(courseId);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
});

router.get("/video/all/:id", async (req, res, next) => {

    const courseId = req.params.id;
    const slug = req.query.slug

    try {
        const data = await videoService.getVideosByCourseIdAndSlug(courseId, slug)

        res.status(200).json({ data })
    }
    catch (err) {
        next(err);
    }
})
router.get("/video/:id", async (req, res, next) => {

    const videoId = req.params.id;

    try {
        const data = await videoService.getVideoById(videoId)

        res.status(200).json({ data })
    }
    catch (err) {
        next(err);
    }
});

router.delete('/video/:id', async (req, res, next) => {
    const { id } = req.params;
    const { videoKey } = req.query;
    try {
        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: videoKey,
        });
        await s3Client.send(command);

        await serviceVideo.DeleteVideo(id);

        return res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.log(error.message)
        next(error)
    }
});

router.post('/publish/:id', async (req, res, next) => {
    const { id } = req.params;
    const { slug } = req.body;


    try {
        const videos = await serviceVideo.GetVideosByCourseIdAndSlug(id, slug);
        const channel = await getRabbitMQChannel();
        const duration = videos.reduce((sum, video) => sum + video.duration, 0);
        const course = await courseService.updateCourse(id, { publish: true, duration });
        const newUploadEvent = {
            type: "course_added",
            data: course
        };
        channel.publish(
            EXCHANGE_NAME,
            ROUTING_KEY.NOTIFICATION,
            Buffer.from(JSON.stringify(newUploadEvent))
        );
        return res.status(201).json({ message: 'Published successfully' });
    } catch (error) {
        console.log(error.message)
        next(error)
    }
});

module.exports = router;