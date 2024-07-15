import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";

const initialState = {
    courseDetails: {
        requestInProgress: false,
        data: {
            id: 0,
            title: "",
            duration: null,
            thumbnailUrl: "",
            tags: [""],
            options: {
                requirements: []
            },
            lectures: [{}],
            totalAttachments: 0
        }
    },
    currentLecture: {
        duration: 0.00,
        requestInProgress: false,
        data: {
            videoList: [],
            videoNo: 1
        }

    }

};


const slice = createSlice({
    initialState,
    name: STATE_REDUCER_KEY,
    reducers: {
        clearAll: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.COURSE_PREVIEW_REQUEST, (state) => {
                state.courseDetails.requestInProgress = true;
            })
            .addCase(ACTION_TYPES.COURSE_PREVIEW_SUCCESS, (state, { payload }) => {
                state.courseDetails.requestInProgress = false;
                state.courseDetails.data = payload.data;
            })
            .addCase(ACTION_TYPES.COURSE_PREVIEW_FAILURE, (state) => {
                state.courseDetails.requestInProgress = false;
            })
            .addCase(ACTION_TYPES.VIEW_LECTURE_REQUEST, (state) => {
                state.currentLecture.requestInProgress = true;
            })
            .addCase(ACTION_TYPES.VIEW_LECTURE_SUCCESS, (state, { payload }) => {
                state.currentLecture.requestInProgress = false;
                state.currentLecture.data = payload.data;
            })
            .addCase(ACTION_TYPES.VIEW_LECTURE_FAILURE, (state) => {
                state.currentLecture.requestInProgress = false;
            }).addCase(ACTION_TYPES.FETCH_LECTURE_DURATION_SUCCESS, (state, { payload }) => {
                state.currentLecture.duration = payload;
            });
    }
});

export const { actions, reducer } = slice;
