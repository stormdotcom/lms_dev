import { flow } from "lodash";

import { STATE_REDUCER_KEY } from "./constants";

const getUserDetails = (state) => state[STATE_REDUCER_KEY];

const pagination = (state) => state.courses.pagination;
export const getPagination = flow(getUserDetails, pagination);

const thumbnailUrl = (state) => state.thumbnailUrl;
export const getThumbnailUrl = flow(getUserDetails, thumbnailUrl);

const courseDetails = (state) => state.courseDetails.data;
export const getCourseDetails = flow(getUserDetails, courseDetails);
