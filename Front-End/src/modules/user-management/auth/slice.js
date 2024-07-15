import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { ACTION_TYPES } from "./actions";
import { STATE_REDUCER_KEY } from "./constants";

const initialState = {
    login: {
        requestInProgress: false,
        data:
            {}
    },
    register: {
        requestInProgress: false,
        data:
            {}
    },
    accessTokenReceived: false

};

const slice = createSlice({
    name: STATE_REDUCER_KEY,
    initialState: initialState,
    reducers: {
        clear: (state) => {
            state.userDetails = initialState.userDetails;
        },
        setLoginFormData: (state, action) => {
            _.set(state, "login.data.username", action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ACTION_TYPES.REFRESH_TOKEN_REQUEST, (state) => {
            state.accessTokenReceived = true;
        }).addCase(ACTION_TYPES.REFRESH_TOKEN_FAILURE, (state) => {
            state.accessTokenReceived = true;
        }).addCase(ACTION_TYPES.REFRESH_TOKEN_SUCCESS, (state) => {
            state.requestInProgress = false;
        });

    }
});

export const { reducer, actions } = slice;
