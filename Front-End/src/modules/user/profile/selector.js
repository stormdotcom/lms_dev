import { flow } from "lodash";

import { STATE_REDUCER_KEY } from "./constants";

const getUserDetails = (state) => state[STATE_REDUCER_KEY];

const profileImageFile = (state) => state.profileImageFile;
export const getProfileImageFile = flow(getUserDetails, profileImageFile);
