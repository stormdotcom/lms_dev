import { all, call, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { handleAPIRequest } from "../../../utils/http";
import { fetchInstructorDashBoardApi } from "./api";

function* fetchInstructorDashBoardSaga() {
  yield call(handleAPIRequest, fetchInstructorDashBoardApi);
}

export default function* instructorSaga() {
  yield all([
    takeLatest(ACTION_TYPES.FETCH_INSTRUCTOR_DASHBOARD, fetchInstructorDashBoardSaga)
  ]);
}

