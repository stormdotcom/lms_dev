import { all, call, fork, put, select, take, takeLatest, delay } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { handleAPIRequest } from "../../../utils/http";
import { navigateTo } from "../../common/actions";
import {
  publishCourseApi, editCourseApi, deleteCourseApi,
  createCourseApi, dropdownApi, uploadThumbnailApi, streamLectureApi, fetchLectureBySlugApi, deleteLectureByIdApi, fetchVideoByVIDApi,
  sendVideoCompleteApi, fetchLectureByIdApi, fetchCoursesApi, fetchCourseByIdSagaApi, fetchVideosBySlug, uploadAttachmentsApi
} from "./api";
import { getAttachments, getLectureDetails, getThumbnail } from "./selector";
import { errorNotify, loaderNotify, successNotify } from "../../../utils/notificationUtils";
import { dismissNotification } from "reapop";
import { transformCourseData } from "./utils";
import { getCourseDetails, getPagination, getThumbnailUrl } from "./selectors";
import { actions } from "./slice";
// import * as _ from "lodash";

function* createCourseSaga({ payload }) {
  const thumbnailUrl = yield select(getThumbnailUrl);
  yield fork(handleAPIRequest, createCourseApi, transformCourseData(payload, thumbnailUrl));
  const responseAction = yield take(ACTION_TYPES.CREATE_COURSE_SUCCESS);
  if (responseAction.type === ACTION_TYPES.CREATE_COURSE_SUCCESS) {
    const { data: { slug = "" } = {} } = responseAction.payload;
    yield put(navigateTo(`instructor/courses/edit/${slug}/`));
  }
}
function* uploadThumbnailSaga() {
  const image = yield select(getThumbnail);
  yield fork(handleAPIRequest, uploadThumbnailApi, image);
  const responseAction = yield take([ACTION_TYPES.UPLOAD_THUMBNAIL_IMAGE_REQUEST, ACTION_TYPES.UPLOAD_THUMBNAIL_IMAGE_SUCCESS]);
  if (responseAction.type === ACTION_TYPES.UPLOAD_THUMBNAIL_IMAGE_SUCCESS) {
    yield put(successNotify({ title: "Upload Success", message: "image uploaded successfully and media url returned" }));
  }
}

function* dropDownSaga() {
  yield call(handleAPIRequest, dropdownApi);
}

function* sendVideoCompleteSaga({ payload }) {
  const no = payload.videoNo || 1;
  const slug = payload.slug || "";
  yield fork(handleAPIRequest, sendVideoCompleteApi, payload);
  yield put(loaderNotify({ title: "Processing Video", message: `saving lecture video #${no} metadata`, id: "video_meta" }));
  const response = yield take([ACTION_TYPES.SENT_COMPLETE_REQUEST, ACTION_TYPES.SENT_COMPLETE_SUCCESS]);
  if (response.type === ACTION_TYPES.SENT_COMPLETE_SUCCESS) {
    yield put(dismissNotification("video_meta"));
    yield delay(500);
    yield fork(handleAPIRequest, fetchLectureBySlugApi, slug);
    yield put(successNotify({ title: "Saved", message: "lecture #" + no }));
  }
}

function* fetchCoursesSaga() {
  const pagination = yield select(getPagination);
  yield call(handleAPIRequest, fetchCoursesApi, { ...pagination });
}

function* fetchCourseByIdSaga({ payload }) {
  yield fork(handleAPIRequest, fetchCourseByIdSagaApi, payload);
  const response = yield take(ACTION_TYPES.FETCH_COURSE_BY_ID_SUCCESS);
  if (response.type === ACTION_TYPES.FETCH_COURSE_BY_ID_SUCCESS) {
    const { id, slug } = response.payload.data;
    yield call(handleAPIRequest, fetchVideosBySlug, { id, slug });
    yield put(navigateTo(`instructor/courses/edit/${slug}/`));
  }

}

function* fetchLectureById({ payload }) {
  yield fork(handleAPIRequest, fetchLectureByIdApi, payload);
  const response = yield take(ACTION_TYPES.FETCH_LECTURE_BY_ID_SUCCESS);
  if (response.type === ACTION_TYPES.FETCH_LECTURE_BY_ID_SUCCESS) {
    const { options: { meta: { videoKey } = {} } = {} } = response.payload.data;
    yield call(handleAPIRequest, streamLectureApi, { videoKey, range: "bytes=0-1048575" });
  }
}

function* streamLectureSaga({ payload }) {
  yield call(handleAPIRequest, streamLectureApi, payload);
}

function* fetchLectureBySlug({ payload }) {
  yield call(handleAPIRequest, fetchLectureBySlugApi, payload);
}

function* deleteLectureSaga({ payload }) {
  const { videoId, videoNo, videoKey } = payload;
  yield fork(handleAPIRequest, deleteLectureByIdApi, { id: videoId, videoNo, videoKey });
  yield put(loaderNotify({ title: "Removing", message: `deleting video #${videoNo}`, id: "del_video_meta" }));
  const response = yield take([ACTION_TYPES.SENT_COMPLETE_REQUEST, ACTION_TYPES.SENT_COMPLETE_SUCCESS]);
  if (response.type === ACTION_TYPES.SENT_COMPLETE_SUCCESS) {
    yield put(dismissNotification("del_video_meta"));
    yield delay(500);
    yield put(successNotify({ title: "Deleted" }));
  }
}

function* uploadAttachmentsSaga({ payload }) {
  const { videoNo, index, slug } = payload;
  const attachments = yield select(getAttachments);
  const lectures = yield select(getLectureDetails);
  if (attachments) {
    const videoId = lectures[index]?.videoId;

    yield put(loaderNotify({ title: "Uploading", message: `Attachments for Lecture #${videoNo}`, id: "upload_attachments" }));
    for (const attachment of attachments) {
      yield put(loaderNotify({ title: attachments.name, message: "Uploading file", id: `file_${attachments.name}` }));
      yield fork(handleAPIRequest, uploadAttachmentsApi, { videoId, data: attachment });
      yield put(dismissNotification(`file_${attachments.name}`));
    }
    const response = take(ACTION_TYPES.UPLOAD_ATTACHMENTS_SUCCESS);
    if (response.type === ACTION_TYPES.UPLOAD_ATTACHMENTS_SUCCESS) {
      yield delay(500);
      yield call(handleAPIRequest, fetchLectureBySlugApi, slug);
      yield put(dismissNotification("upload_attachments"));
      yield put(successNotify({ title: "Uploaded Success" }));
    }
  } else {
    yield put(errorNotify({ title: "No file selected", message: "please select atleast one file" }));
  }


}

function* fetchVideoByVIDSaga({ payload }) {
  yield call(handleAPIRequest, fetchVideoByVIDApi, payload);
}

function* publishCourse({ payload }) {
  const { slug, courseId } = payload;
  yield fork(handleAPIRequest, publishCourseApi, { slug, courseId });
  yield put(loaderNotify({ title: "Publishing Course", message: `${slug}`, id: "publishing" }));
  const response = yield take([ACTION_TYPES.PUBLISH_COURSE_REQUEST, ACTION_TYPES.PUBLISH_COURSE_SUCCESS]);
  if (response.type === ACTION_TYPES.PUBLISH_COURSE_SUCCESS) {
    yield put(dismissNotification("publishing"));
    yield delay(500);
    yield put(successNotify({ title: "Saved" }));
    yield put(navigateTo("instructor/courses"));
  }
}

function* editCourse({ payload }) {
  const { slug, id } = payload;
  const thumbnailUrl = yield select(getThumbnailUrl);
  yield fork(handleAPIRequest, editCourseApi, { id, ...transformCourseData(payload, thumbnailUrl) });
  yield put(loaderNotify({ title: "Updating Course Details", message: `${payload.title}`, id: "Updating" }));
  const response = yield take([ACTION_TYPES.EDIT_COURSE_REQUEST, ACTION_TYPES.EDIT_COURSE_SUCCESS]);
  if (response.type === ACTION_TYPES.EDIT_COURSE_SUCCESS) {
    yield put(dismissNotification("Updating"));
    yield delay(500);
    yield put(successNotify({ title: "Course Details Updated" }));
    yield put(actions.setCourseEdit(false));
    yield call(handleAPIRequest, fetchLectureBySlugApi, slug);

  }
}

function* deleteCourse() {
  const payload = yield select(getCourseDetails);
  const { id } = payload;
  yield fork(handleAPIRequest, deleteCourseApi, id);
  yield put(loaderNotify({ title: "Removing", message: "Removing Course from the list", id: "removing" }));
  const response = yield take([ACTION_TYPES.DELETE_COURSE_SUCCESS, ACTION_TYPES.DELETE_COURSE_FAILURE]);
  if (response.type === ACTION_TYPES.DELETE_COURSE_SUCCESS) {
    yield put(dismissNotification("removing"));
    yield put(navigateTo("instructor/courses"));
  }


}

export default function* homeSaga() {
  yield all([
    takeLatest(ACTION_TYPES.CREATE_COURSE, createCourseSaga),
    takeLatest(ACTION_TYPES.UPLOAD_THUMBNAIL_IMAGE, uploadThumbnailSaga),
    takeLatest(ACTION_TYPES.DROP_DOWN, dropDownSaga),
    takeLatest(ACTION_TYPES.SENT_COMPLETE, sendVideoCompleteSaga),
    takeLatest(ACTION_TYPES.FETCH_COURSE, fetchCoursesSaga),
    takeLatest(ACTION_TYPES.FETCH_COURSE_BY_ID, fetchCourseByIdSaga),
    takeLatest(ACTION_TYPES.FETCH_LECTURE_BY_ID, fetchLectureById),
    takeLatest(ACTION_TYPES.STREAM_LECTURE, streamLectureSaga),
    takeLatest(ACTION_TYPES.FETCH_COURSE_BY_SLUG, fetchLectureBySlug),
    takeLatest(ACTION_TYPES.DELETE_LECTURE, deleteLectureSaga),
    takeLatest(ACTION_TYPES.UPLOAD_ATTACHMENTS, uploadAttachmentsSaga),
    takeLatest(ACTION_TYPES.FETCH_VIDEO_BY_VID, fetchVideoByVIDSaga),
    takeLatest(ACTION_TYPES.PUBLISH_COURSE, publishCourse),
    takeLatest(ACTION_TYPES.EDIT_COURSE, editCourse),

    takeLatest(ACTION_TYPES.DELETE_COURSE, deleteCourse)
  ]);
}
