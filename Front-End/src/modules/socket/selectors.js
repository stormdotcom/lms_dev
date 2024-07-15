import { flow } from "lodash";

import { STATE_REDUCER_KEY } from "./constants";

const getUserDetails = (state) => state[STATE_REDUCER_KEY];

const pagination = (state) => state.pagination;
export const getPagination = flow(getUserDetails, pagination);
