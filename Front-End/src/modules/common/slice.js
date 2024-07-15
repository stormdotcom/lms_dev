import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import { ACTION_TYPES as AUTH } from "../user-management/auth/actions";
import { ACTION_TYPES as PROFILE } from "../user/profile/actions";


const initialState = {
    navigator: null,
    table: {},
    homePath: "home/dashboard",
    userDetails: {
        firstName: "____",
        lastName: "____",
        phone: "",
        email: "",
        options: {
            bio: ""
        },
        role: "",
        isVerified: false
    }
};


const slice = createSlice({
    initialState,
    name: STATE_REDUCER_KEY,
    reducers: {
        clearAll: () => initialState,
        clearUserDetails: (state) => {
            state.userDetails = initialState.userDetails;
        },
        setNavigator: (state, action) => {
            state.navigator = action.payload;
        },
        setHomePath: (state, action) => {
            state.homePath = action.payload;
        },
        setUserDetails(state, action) {
            state.userDetails = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AUTH.REFRESH_TOKEN_SUCCESS, (state, { payload }) => {
                state.userDetails = payload.userDetails;
            })
            .addCase(AUTH.LOGIN_SUCCESS, (state, { payload }) => {

                state.userDetails = payload.userDetails;

            }).addCase(AUTH.REGISTER_SUCCESS, (state, { payload }) => {
                state.userDetails = payload.userDetails;
            })
            .addCase(PROFILE.UPDATE_USER_DETAILS_SUCCESS, (state, { payload }) => {
                state.userDetails = payload.data;
            })
            .addCase(PROFILE.UPLOAD_IMAGE_SUCCESS, (state, { payload }) => {
                state.userDetails.profileAvatarUrl = payload.data;
            });
    }
});

export const { actions, reducer } = slice;
