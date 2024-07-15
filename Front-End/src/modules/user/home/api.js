import { API_URL } from "./apiUrls";
import { REQUEST_METHOD } from "../../../common/constants";
import { ACTION_TYPES } from "./actions";
export const fetchCurrentUserAPI = () => {
    return {
        url: API_URL.PROFILE.USER,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.GET_USER_DETAILS, ACTION_TYPES.GET_USER_DETAILS_SUCCESS, ACTION_TYPES.GET_USER_DETAILS_FAILURE]
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

export const recentActivitiesApi = () => {
    return {
        url: API_URL.HOME.RECENT_ACTIVITIES,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.RECENT_ACTIVITIES_REQUEST, ACTION_TYPES.RECENT_ACTIVITIES_SUCCESS, ACTION_TYPES.RECENT_ACTIVITIES_FAILURE]
        }
    };
};

export const fetchCourseListApi = () => {
    return {
        url: API_URL.COURSE.ALL,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_COURSE_LIST_REQUEST, ACTION_TYPES.FETCH_COURSE_LIST_SUCCESS, ACTION_TYPES.FETCH_COURSE_LIST_FAILURE]
        }
    };
};
