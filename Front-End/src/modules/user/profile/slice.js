import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES } from "./actions";
import _ from "lodash";

const initialState = {
    profileDetails: {
        requestInProgress: false,
        uploadInProgress: false,
        data: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            bio: ""
        }
    },
    profileImageFile: null,
    recentActivities: {
        requestInProgress: false,
        data: []
    },
    recommendedCourse: {}
};


const slice = createSlice({
    initialState,
    name: STATE_REDUCER_KEY,
    reducers: {
        clearAll: () => initialState,
        setImage: (state, { payload }) => {
            state.profileImageFile = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.GET_USER_DETAILS_REQUEST, (state) => {
                state.profileDetails.requestInProgress = true;
            }).addCase(ACTION_TYPES.GET_USER_DETAILS_SUCCESS, (state, { payload }) => {
                state.profileDetails.requestInProgress = false;
                state.profileDetails.data = payload.data;
                const bio = payload.data.options.bio;
                _.set(state, "profileDetails.data.bio", bio);
            }).addCase(ACTION_TYPES.GET_USER_DETAILS_FAILURE, (state) => {
                state.profileDetails.requestInProgress = false;
            })

            .addCase(ACTION_TYPES.UPDATE_USER_DETAILS_REQUEST, (state) => {
                state.profileDetails.requestInProgress = true;
            }).addCase(ACTION_TYPES.UPDATE_USER_DETAILS_SUCCESS, (state, { payload }) => {
                state.profileDetails.requestInProgress = false;
                const data = { ...payload.data, bio: payload.data.options.bio };
                state.profileDetails.data = data;
            }).addCase(ACTION_TYPES.UPDATE_USER_DETAILS_FAILURE, (state) => {
                state.profileDetails.requestInProgress = false;
            })
            .addCase(ACTION_TYPES.UPLOAD_IMAGE_REQUEST, (state) => {
                state.profileDetails.uploadInProgress = true;
            }).addCase(ACTION_TYPES.UPLOAD_IMAGE_SUCCESS, (state, { payload }) => {
                state.profileDetails.uploadInProgress = false;
                state.profileDetails.data.profileAvatarUrl = payload.data;
            }).addCase(ACTION_TYPES.UPLOAD_IMAGE_FAILURE, (state) => {
                state.profileDetails.uploadInProgress = false;
            });

    }
});

export const { actions, reducer } = slice;
