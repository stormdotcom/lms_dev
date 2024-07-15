const API_URL = {
    COURSE: {
        CREATE: "service/instructor/course/create",
        COURSE_THUMBNAIL: "uploads/media/course/thumbnail-image",
        DROPDOWN: "service/instructor/course/downApi",
        // VIDEO: "uploads/media/course/video",
        // COMPLETE: "uploads/media/course/video/complete",
        // GET_URL: "uploads/media/course/video/url"
        VIDEO: "media/course/video",
        COMPLETE: "service/media/course/video/complete",
        GET_URL: "media/course/video/url",
        ALL_COURSE: "service/instructor/course/all",
        BY_ID: "service/instructor/course/details/:id",
        VIDEOS_ALL: "service/instructor/course/video/all/:id",
        STREAM: "media/course/video/stream",
        LECTURE: "service/instructor/course/video/:id",
        BY_SLUG: "service/instructor/course/details/:slug",
        DEL_BY_ID: "service/instructor/course/video/:id",
        ATTACHMENT: "uploads/media/course/attachment/:videoId",
        PUBLISH: "service/instructor/course/publish/:id"
    }
};

export { API_URL };
