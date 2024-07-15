import { all, call, select, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "../profile/actions";
import { handleAPIRequest } from "../../../utils/http";
import { getUserDetailsApi, uploadImageApi, updateUserDetailsApi } from "./api";
import { getProfileImageFile } from "./selector";
import * as _ from "lodash";
function* getUserDetailsSaga() {
  yield call(handleAPIRequest, getUserDetailsApi);
}


function* uploadImageSaga() {
  const imageData = yield select(getProfileImageFile);
  if (imageData) {
    yield call(handleAPIRequest, uploadImageApi, imageData);
  }

}

function* updateUserDetails({ payload }) {
  const newFormData = _.cloneDeep(payload);
  _.set(newFormData, "options.bio", payload.bio);
  const data = _.omit(newFormData, ["email", "profileAvatarUrl", "bio"]);
  yield call(handleAPIRequest, updateUserDetailsApi, data);
}

export default function* homeSaga() {
  yield all([
    takeLatest(ACTION_TYPES.GET_USER_DETAILS, getUserDetailsSaga),
    takeLatest(ACTION_TYPES.UPLOAD_IMAGE, uploadImageSaga),
    takeLatest(ACTION_TYPES.UPDATE_USER_DETAILS, updateUserDetails)
  ]);
}

