import { flow } from "lodash";

import { STATE_REDUCER_KEY } from "./constants";

const getUserDetails = (state) => state[STATE_REDUCER_KEY];

const thumbnail = (state) => state.thumbnail;
export const getThumbnail = flow(getUserDetails, thumbnail);

const attachments = (state) => state.attachments;
export const getAttachments = flow(getUserDetails, attachments);


const lectureDetails = (state) => state.lectureDetails.data.lectures;
export const getLectureDetails = flow(getUserDetails, lectureDetails);
