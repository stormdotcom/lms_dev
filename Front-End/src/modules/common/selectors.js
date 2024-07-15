import { flow } from "lodash";

import { STATE_REDUCER_KEY } from "./constants";

const getUserDetails = (state) => state[STATE_REDUCER_KEY];

const userData = (state) => state.user;
export const getUserData = flow(getUserDetails, userData);

const navigator = (state) => state.navigator;
export const getNavigator = flow(getUserDetails, navigator);

