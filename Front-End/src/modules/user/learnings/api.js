import { API_URL } from "./apiUrls";
import { REQUEST_METHOD } from "../../../common/constants";
import { ACTION_TYPES } from "./actions";

export const previewCourseApi = (slug) => {
    return {
        url: API_URL.COURSE.BY_SLUG.replace(":slug", slug),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.COURSE_PREVIEW_REQUEST, ACTION_TYPES.COURSE_PREVIEW_SUCCESS, ACTION_TYPES.COURSE_PREVIEW_FAILURE]
        }
    };
};

export const viewLectureAPi = () => {
    return {
        url: API_URL.COURSE.BY_ID_VIDEO,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.VIEW_LECTURE_REQUEST, ACTION_TYPES.VIEW_LECTURE_SUCCESS, ACTION_TYPES.VIEW_LECTURE_FAILURE]
        }
    };
};

export const dashboardApi = () => {
    return {
        url: API_URL.HOME.DASHBOARD,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.DASHBOARD_REQUEST, ACTION_TYPES.DASHBOARD_SUCCESS, ACTION_TYPES.DASHBOARD_FAILURE]
        }
    };
};


export const lectureAndPlaylistApi = (id) => {
    return {
        url: API_URL.COURSE.BY_ID_VIDEO.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.VIEW_LECTURE_REQUEST, ACTION_TYPES.VIEW_LECTURE_SUCCESS, ACTION_TYPES.VIEW_LECTURE_FAILURE]
        }
    };
};

export const lectureDurationApi = (id) => {
    return {
        url: API_URL.COURSE.DURATION.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_LECTURE_DURATION_REQUEST, ACTION_TYPES.FETCH_LECTURE_DURATION_SUCCESS, ACTION_TYPES.FETCH_LECTURE_DURATION_FAILURE]
        }
    };
};
