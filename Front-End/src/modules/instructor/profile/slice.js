import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
// import { ACTION_TYPES } from "./actions";


const initialState = {
    profileDetails: {
        requestInProgress: false,
        uploadInProgress: false,
        data: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            options: {
                bio: ""
            }
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
    }
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(ACTION_TYPES.GET_USER_DETAILS_REQUEST, (state) => {
    //             state.profileDetails.requestInProgress = true;
    //         });
    // }
});

export const { actions, reducer } = slice;
