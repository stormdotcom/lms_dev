import { flow } from "lodash";

import { STATE_REDUCER_KEY } from "./constants";

const getUserDetails = (state) => state[STATE_REDUCER_KEY];

const accessTokenReceived = (state) => state.accessTokenReceived;
export const getAccessTokenReceived = flow(getUserDetails, accessTokenReceived);
