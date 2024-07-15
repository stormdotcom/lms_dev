const { EXCHANGE_NAME, ROUTING_KEY } = require("../../../config/constants");
const VideoDurationRepository = require("../../../database/repository/duration-repository");
const CourseService = require("../../../services/course-service");
const VideoService = require("../../../services/video-service");
const { ResponseDataSuccess } = require("../../../utils/common-utils");
const { getRabbitMQChannel } = require("../../../utils/rabbit-mq");
const express = require('express');
const router = express.Router();
const _ = require("lodash");

const courseService = new CourseService();
const videoService = new VideoService();
const ds = new VideoDurationRepository();

router.get("/completed", async (req, res, next) => {
  try {
    // db saved
    if (1 === 1) {
      const channel = await getRabbitMQChannel();
      const notification = { type: "course_completed", data: "Test" };
      channel.publish(
        "notifications",
        "",
        Buffer.from(JSON.stringify(notification))
      );
      return res.status(201).json(ResponseDataSuccess());
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;


router.get("/course-all", async (req, res, next) => {
  try {
    const criteria = { publish: true }
    const attributes = ["title", "updatedAt", "description", "id", "slug", "thumbnailUrl"]
    const result = await courseService.listCourses(criteria, attributes, true)
    return res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.get("/video/:id", async (req, res, next) => {
  try {
    let result = {}
    const id = req.params.id
    result = await videoService.GetVideoById(id);
    videoNO = result.options.meta.videoNo;
    console.log("here videoNO", videoNO);
    result = _.pick(result, ["courseId", "sourceUrl", "attachments", "title"]);

    result.videoNO = videoNO;
    const courseId = result?.courseId
    console.log("here courseId", courseId);

    const videoList = await videoService.ListVideoPlayList(courseId);
    result.videoList = videoList
    return res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.get("/duration/video/:id", async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const userId = req.user.id;
    const duration = await ds.getDurationByVideoIdUserId({ videoId, userId });
    return res.status(200).json(duration);
  } catch (err) {
    next(err);
  }
});

router.get("/course/:slug", async (req, res, next) => {
  try {
    let result = {}
    const slug = req.params.slug
    result = await courseService.getCourseBySlug(slug)
    const lectures = await videoService.getAllCourseByCriteria({ courseId: result.id }, ["title", "duration", "sourceUrl", "attachments", "id"]);
    const attachmentCounts = lectures.map(item => item.attachments?.length ?? 0);
    result.previewUrl = lectures[0]?.sourceUrl;
    const totalAttachments = attachmentCounts.reduce((acc, count) => acc + count, 0);
    result.lectures = lectures
    result.totalAttachments = totalAttachments;
    return res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
