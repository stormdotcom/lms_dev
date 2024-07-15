import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";

const initialState = {
    dashboard: {
        requestInProgress: false,
        data: []
    },
    recentActivities: {
        requestInProgress: false,
        data: []
    },
    recommendedCourse: {},
    courseList: {
        requestInProgress: false,
        data: []
    }
};


const slice = createSlice({
    initialState,
    name: STATE_REDUCER_KEY,
    reducers: {
        clearAll: () => initialState
    }, extraReducers: (builder) => {
        builder.addCase(ACTION_TYPES.RECENT_ACTIVITIES_REQUEST, (state) => {
            state.recentActivities.requestInProgress = true;
        }).addCase(ACTION_TYPES.RECENT_ACTIVITIES_SUCCESS, (state, { payload }) => {
            state.recentActivities.requestInProgress = false;
            state.recentActivities.data = payload;
        }).addCase(ACTION_TYPES.RECENT_ACTIVITIES_FAILURE, (state) => {
            state.recentActivities.requestInProgress = false;
        }).addCase(ACTION_TYPES.FETCH_COURSE_LIST_REQUEST, (state) => {
            state.courseList.requestInProgress = true;
        }).addCase(ACTION_TYPES.FETCH_COURSE_LIST_SUCCESS, (state, { payload }) => {
            state.courseList.requestInProgress = false;
            state.courseList.data = payload.data;
        }).addCase(ACTION_TYPES.FETCH_COURSE_LIST_FAILURE, (state) => {
            state.courseList.requestInProgress = false;

        });

    }
});

export const { actions, reducer } = slice;
