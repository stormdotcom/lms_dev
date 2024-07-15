import { API_URL } from "./apiUrls";
import { REQUEST_METHOD } from "../../../common/constants";
import { ACTION_TYPES } from "./actions";
export const getUserDetailsApi = () => {
    return {
        url: API_URL.MENU.USER,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.GET_USER_DETAILS_REQUEST, ACTION_TYPES.GET_USER_DETAILS_SUCCESS, ACTION_TYPES.GET_USER_DETAILS_FAILURE]
        }
    };
};

export const uploadImageApi = (data) => {
    return {
        url: API_URL.MENU.PROFILE_IMAGE,
        method: REQUEST_METHOD.FILE,
        payload: {
            types: [ACTION_TYPES.UPLOAD_IMAGE_REQUEST, ACTION_TYPES.UPLOAD_IMAGE_SUCCESS, ACTION_TYPES.UPLOAD_IMAGE_FAILURE],
            data
        }

    };
};

export const updateUserDetailsApi = (data) => {
    return {
        url: API_URL.MENU.USER,
        method: REQUEST_METHOD.PUT,
        payload: {
            types: [ACTION_TYPES.UPDATE_USER_DETAILS_REQUEST, ACTION_TYPES.UPDATE_USER_DETAILS_SUCCESS, ACTION_TYPES.UPDATE_USER_DETAILS_FAILURE],
            data
        }
    };
};


