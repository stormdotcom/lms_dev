import { API_URL } from "./apiUrls";
import { REQUEST_METHOD } from "../../../common/constants";
import { ACTION_TYPES } from "./actions";

export const createCourseApi = (data) => {
    return {
        url: API_URL.COURSE.CREATE,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.CREATE_COURSE_REQUEST, ACTION_TYPES.CREATE_COURSE_SUCCESS, ACTION_TYPES.CREATE_COURSE_FAILURE],
            data
        }
    };
};

export const uploadThumbnailApi = (data) => {
    return {
        url: API_URL.COURSE.COURSE_THUMBNAIL,
        method: REQUEST_METHOD.FILE,
        payload: {
            types: [ACTION_TYPES.UPLOAD_THUMBNAIL_IMAGE_REQUEST, ACTION_TYPES.UPLOAD_THUMBNAIL_IMAGE_SUCCESS, ACTION_TYPES.UPLOAD_THUMBNAIL_IMAGE_FAILURE],
            data
        }

    };
};

export const dropdownApi = () => {
    return {
        url: API_URL.COURSE.DROPDOWN,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.DROP_DOWN_REQUEST, ACTION_TYPES.DROP_DOWN_SUCCESS, ACTION_TYPES.DROP_DOWN_FAILURE]
        }
    };
};

export const sendVideoCompleteApi = (data) => {
    return {
        url: API_URL.COURSE.COMPLETE,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.SENT_COMPLETE_REQUEST, ACTION_TYPES.SENT_COMPLETE_SUCCESS, ACTION_TYPES.SENT_COMPLETE_FAILURE],
            data
        }
    };
};


export const fetchCoursesApi = (data) => {
    return {
        url: API_URL.COURSE.ALL_COURSE,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_COURSE_REQUEST, ACTION_TYPES.FETCH_COURSE_SUCCESS, ACTION_TYPES.FETCH_COURSE_FAILURE],
            data
        }
    };
};


export const fetchCourseByIdSagaApi = (id) => {
    return {
        url: API_URL.COURSE.BY_ID.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_COURSE_BY_ID_REQUEST, ACTION_TYPES.FETCH_COURSE_BY_ID_SUCCESS, ACTION_TYPES.FETCH_COURSE_BY_ID_FAILURE]
        }
    };
};

export const fetchVideosBySlug = (payload) => {
    const { id, ...data } = payload;
    return {
        url: API_URL.COURSE.VIDEOS_ALL.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_VIDEOS_BY_SLUG_REQUEST, ACTION_TYPES.FETCH_VIDEOS_BY_SLUG_SUCCESS, ACTION_TYPES.FETCH_VIDEOS_BY_SLUG_FAILURE],
            data
        }
    };
};


export const fetchLectureByIdApi = (id) => {
    return {
        url: API_URL.COURSE.LECTURE.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_LECTURE_BY_ID_REQUEST, ACTION_TYPES.FETCH_LECTURE_BY_ID_SUCCESS, ACTION_TYPES.FETCH_LECTURE_BY_ID_FAILURE]
        }
    };
};


export const streamLectureApi = (data) => {
    return {
        url: API_URL.COURSE.STREAM,
        method: REQUEST_METHOD.VIDEO,
        payload: {
            types: [ACTION_TYPES.STREAM_LECTURE_REQUEST, ACTION_TYPES.STREAM_LECTURE_SUCCESS, ACTION_TYPES.STREAM_LECTURE_FAILURE],
            data
        }
    };
};

export const fetchLectureBySlugApi = (slug) => {
    return {
        url: API_URL.COURSE.BY_SLUG.replace(":slug", slug),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_COURSE_BY_SLUG_REQUEST, ACTION_TYPES.FETCH_COURSE_BY_SLUG_SUCCESS, ACTION_TYPES.FETCH_COURSE_BY_SLUG_FAILURE]
        }
    };
};

export const deleteLectureByIdApi = ({ id, ...data }) => {
    return {
        url: API_URL.COURSE.DEL_BY_ID.replace(":id", id),
        method: REQUEST_METHOD.DELETE,
        payload: {
            types: [ACTION_TYPES.DELETE_LECTURE_REQUEST, ACTION_TYPES.DELETE_LECTURE_SUCCESS, ACTION_TYPES.DELETE_LECTURE_FAILURE],
            data
        }
    };
};


export const uploadAttachmentsApi = ({ videoId, data }) => {
    return {
        url: API_URL.COURSE.ATTACHMENT.replace(":videoId", videoId),
        method: REQUEST_METHOD.FILE,
        payload: {
            types: [ACTION_TYPES.UPLOAD_ATTACHMENTS_REQUEST, ACTION_TYPES.UPLOAD_ATTACHMENTS_SUCCESS, ACTION_TYPES.UPLOAD_ATTACHMENTS_FAILURE],
            data
        }
    };
};


export const fetchVideoByVIDApi = (videoId) => {
    return {
        url: API_URL.COURSE.ATTACHMENT.replace(":videoId", videoId),
        method: REQUEST_METHOD.FILE,
        payload: {
            types: [ACTION_TYPES.UPLOAD_ATTACHMENTS_REQUEST, ACTION_TYPES.UPLOAD_ATTACHMENTS_SUCCESS, ACTION_TYPES.UPLOAD_ATTACHMENTS_FAILURE]
        }
    };
};


export const publishCourseApi = ({ courseId, slug }) => {
    return {
        url: API_URL.COURSE.PUBLISH.replace(":id", courseId),
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.PUBLISH_COURSE_REQUEST, ACTION_TYPES.PUBLISH_COURSE_SUCCESS, ACTION_TYPES.PUBLISH_COURSE_FAILURE],
            data: { slug }
        }
    };
};

export const editCourseApi = ({ id, ...data }) => {
    return {
        url: API_URL.COURSE.BY_ID.replace(":id", id),
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.EDIT_COURSE_REQUEST, ACTION_TYPES.EDIT_COURSE_SUCCESS, ACTION_TYPES.EDIT_COURSE_FAILURE],
            data
        }
    };
};

export const deleteCourseApi = (id) => {
    return {
        url: API_URL.COURSE.BY_ID.replace(":id", id),
        method: REQUEST_METHOD.DELETE,
        payload: {
            types: [ACTION_TYPES.DELETE_COURSE_REQUEST, ACTION_TYPES.DELETE_COURSE_SUCCESS, ACTION_TYPES.DELETE_COURSE_FAILURE]
        }
    };
};
