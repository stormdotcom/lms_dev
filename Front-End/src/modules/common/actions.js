import { createAction } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";

export const ACTION_TYPES = {

    LOG_OUT: `${STATE_REDUCER_KEY}/LOG_OUT`,

    NAVIGATE_TO: `${STATE_REDUCER_KEY}/NAVIGATE_TO`,
    REFRESH_CURRENT_PATH: `${STATE_REDUCER_KEY}/REFRESH_CURRENT_PATH`,

    EVENT: `${STATE_REDUCER_KEY}/EVENT`,
    EVENT_REQUEST: `${STATE_REDUCER_KEY}/EVENT_REQUEST`,
    EVENT_SUCCESS: `${STATE_REDUCER_KEY}/EVENT_SUCCESS`,
    EVENT_FAILURE: `${STATE_REDUCER_KEY}/EVENT_FAILURE`

};

export const logout = createAction(ACTION_TYPES.LOG_OUT);
export const navigateTo = createAction(ACTION_TYPES.NAVIGATE_TO);
export const refresh = createAction(ACTION_TYPES.REFRESH_CURRENT_PATH);
export const sentEvent = createAction(ACTION_TYPES.EVENT);
