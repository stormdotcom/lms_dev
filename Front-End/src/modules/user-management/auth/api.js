import { REQUEST_METHOD } from "../../../common/constants";
import { ACTION_TYPES } from "./actions";
import API_URL from "./apiUrls";


export const signInApi = (data) => {
    return {
        url: API_URL.AUTH.SIGN_IN,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.LOGIN_REQUEST, ACTION_TYPES.LOGIN_SUCCESS, ACTION_TYPES.LOGIN_FAILURE],
            data: data
        }
    };
};
export const signUpApi = (data) => {
    return {
        url: API_URL.AUTH.SIGN_UP,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.REGISTER_REQUEST, ACTION_TYPES.REGISTER_SUCCESS, ACTION_TYPES.REGISTER_FAILURE],
            data: data
        }
    };
};


export const refreshTokenApi = (token) => {
    return {
        url: API_URL.AUTH.REFRESH_TOKEN,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.REFRESH_TOKEN_REQUEST, ACTION_TYPES.REFRESH_TOKEN_SUCCESS, ACTION_TYPES.REFRESH_TOKEN_FAILURE]
        },
        token
    };
};

export const fetchCurrentUserAPI = () => {
    return {
        url: API_URL.USER_MANAGEMENT.GET_CURRENT_PROFILE,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.GET_USER_DETAILS_REQUEST, ACTION_TYPES.GET_USER_DETAILS_SUCCESS, ACTION_TYPES.GET_USER_DETAILS_FAILURE]
        }
    };
};
