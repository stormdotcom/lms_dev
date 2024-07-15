import { API_URL } from "./apiUrls";
import { REQUEST_METHOD } from "../../../common/constants";
import { ACTION_TYPES } from "./actions";


export const fetchInstructorDashBoardApi = () => {
    return {
        url: API_URL.CARDS.VALUES,
        method: REQUEST_METHOD.GET,
        payload: {
            types: [ACTION_TYPES.FETCH_INSTRUCTOR_DASHBOARD_REQUEST, ACTION_TYPES.FETCH_INSTRUCTOR_DASHBOARD_SUCCESS, ACTION_TYPES.FETCH_INSTRUCTOR_DASHBOARD_FAILURE]
        }
    };
};
