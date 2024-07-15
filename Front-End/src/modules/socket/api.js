import { REQUEST_METHOD } from "../../common/constants";
import { ACTION_TYPES } from "./actions";
import { API_URL } from "./apiUrls";

export const notificationListApi = (data) => {
    return {
        url: API_URL.NOTIFICATION,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.NOTIFICATION_LIST_REQUEST, ACTION_TYPES.NOTIFICATION_LIST_SUCCESS, ACTION_TYPES.NOTIFICATION_LIST_FAILURE],
            data
        }
    };
};


export const readNotificationApi = (id) => {
    return {
        url: API_URL.READ.replace(":id", id),
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.READ_NOTIFICATION_REQUEST, ACTION_TYPES.READ_NOTIFICATION_SUCCESS, ACTION_TYPES.READ_NOTIFICATION_FAILURE]
        }
    };
};
