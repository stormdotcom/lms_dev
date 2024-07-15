
import { all, call, fork, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { handleAPIRequest } from "../../../utils/http";
import { previewCourseApi, lectureAndPlaylistApi, lectureDurationApi } from "./api";

function* previewCourse({ payload }) {
  yield call(handleAPIRequest, previewCourseApi, payload);
}

function* lectureAndPlaylist({ payload }) {
  yield fork(handleAPIRequest, lectureAndPlaylistApi, payload);
  const response = yield take(ACTION_TYPES.VIEW_LECTURE_SUCCESS);
  if (response.type === ACTION_TYPES.VIEW_LECTURE_SUCCESS) {
    yield call(handleAPIRequest, lectureDurationApi, payload);
  }
}
export default function* homeSaga() {
  yield all([
    takeLatest(ACTION_TYPES.COURSE_PREVIEW, previewCourse),
    takeLatest(ACTION_TYPES.VIEW_LECTURE, lectureAndPlaylist)
  ]);
}
