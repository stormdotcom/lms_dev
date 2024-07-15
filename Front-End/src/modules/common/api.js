import { REQUEST_METHOD } from "../../common/constants";
import { ACTION_TYPES } from "./actions";
import { API_URL } from "./apiUrls";

export const eventApi = (data) => {
    return {
        url: API_URL.EVENTS.SENT_EVENT,
        method: REQUEST_METHOD.POST,
        payload: {
            types: [ACTION_TYPES.EVENT_REQUEST, ACTION_TYPES.EVENT_SUCCESS, ACTION_TYPES.EVENT_FAILURE],
            data
        }

    };
};
