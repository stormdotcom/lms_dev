/* eslint-disable camelcase */
import { all, call, delay, fork, put, take, takeLatest } from "redux-saga/effects";
import { ACTION_TYPES } from "./actions";
import { signInApi, signUpApi } from "./api";
import { handleAPIRequest } from "../../../utils/http";

import { logout, navigateTo, sentEvent } from "../../common/actions";
import { USER_TYPE } from "./constants";
import { actions as commonActions } from "../../common/slice";

import _ from "lodash";
import { loaderNotify } from "../../../utils/notificationUtils";
import { dismissNotification } from "reapop";
import { BROWSER_STORAGE, EVENT_TYPES, HTTP } from "../../../common/constants";
import API_URL from "./apiUrls";
import { getRequest } from "../../../@app/axios";

export function* login({ payload }) {
  yield fork(handleAPIRequest, signInApi, payload);
  const responseAction = yield take([ACTION_TYPES.LOGIN_FAILURE, ACTION_TYPES.LOGIN_SUCCESS]);
  if (responseAction.type === ACTION_TYPES.LOGIN_SUCCESS) {
    const { payload: { accessToken, userDetails = {}, refreshToken } = {} } = responseAction;
    localStorage.setItem(BROWSER_STORAGE.ACCESS_TOKEN, accessToken);
    localStorage.setItem(BROWSER_STORAGE.REFRESH_TOKEN, refreshToken);

    yield put(loaderNotify({ title: "Logged In", message: "Preparing User Account", id: "login_success" }));
    // yield put(loaderNotify({ title: "Preparing Your Dashboard", message: "We are fetching your Home. This won't take long!", id: "profile_fetch" }));
    const { role = "" } = userDetails;
    if (role === USER_TYPE.ADMIN) {

      yield put(navigateTo("/admin/dashboard"));
      yield put(commonActions.setHomePath("admin/dashboard"));
    } else if (role === USER_TYPE.CREATOR) {

      yield put(navigateTo("/instructor/dashboard"));
      yield put(commonActions.setHomePath("instructor/dashboard"));
    } else {

      yield put(navigateTo("/home/dashboard"));
      yield put(commonActions.setHomePath("home/dashboard"));
    }
    yield delay(1500);
    yield put(dismissNotification("login_success"));
    const eventData = { type: EVENT_TYPES.LOGGED_IN_SESSION };
    yield put(sentEvent(eventData));
  }
}

export function* register({ payload }) {
  let formData = _.cloneDeep(payload);
  yield fork(handleAPIRequest, signUpApi, formData);
  const responseAction = yield take([ACTION_TYPES.REFRESH_TOKEN_REQUEST, ACTION_TYPES.REGISTER_SUCCESS]);
  if (responseAction.type === ACTION_TYPES.REGISTER_SUCCESS) {
    const { payload: { accessToken, userDetails = {}, refreshToken } = {} } = responseAction;
    localStorage.setItem(BROWSER_STORAGE.ACCESS_TOKEN, accessToken);
    localStorage.setItem(BROWSER_STORAGE.REFRESH_TOKEN, refreshToken);
    yield put(loaderNotify({ title: "Account Registered", message: "Preparing User Account", id: "register_success" }));
    // yield put(loaderNotify({ title: "Preparing Your Dashboard", message: "We are fetching your Home. This won't take long!", id: "profile_fetch" }));

    const { data: { userType = "" } = {} } = userDetails;
    if (userType === USER_TYPE.ADMIN) {
      yield put(navigateTo("/admin/dashboard"));
      yield put(commonActions.setHomePath("admin/dashboard"));
    } else if (userType === USER_TYPE.CREATOR) {
      yield put(navigateTo("/instructor/dashboard"));
      yield put(commonActions.setHomePath("instructor/dashboard"));
    } else {
      yield put(navigateTo("/home/dashboard"));
      yield put(commonActions.setHomePath("home/dashboard"));
    }
    yield delay(1500);
    yield put(dismissNotification("register_success"));
    const eventData = { type: EVENT_TYPES.LOGGED_IN_SESSION };
    yield put(sentEvent(eventData));
  }
}

export const getRequestParams = ({ data }) => {
  let headers = HTTP.HTTP_HEADERS;
  let baseURL = process.env.REACT_APP_API_URL || "";
  let authHeaders = {};
  let bearerToken = localStorage.getItem(BROWSER_STORAGE.REFRESH_TOKEN);
  let extraParams = {};
  authHeaders = { Authorization: `Bearer ${bearerToken}` };
  let api = getRequest;
  return { config: { headers: { ...headers, ...authHeaders }, ...extraParams }, baseURL, data, api };
};
export function* refreshTokenSaga() {
  yield put({ type: ACTION_TYPES.REFRESH_TOKEN_REQUEST });
  //  const { api, config, baseURL, data } = getRequestParams({ url, data: payloadData, method });
  const { api, config, baseURL } = getRequestParams({
    url: API_URL.AUTH.REFRESH_TOKEN

  });
  const apiResponse = yield call(api, API_URL.AUTH.REFRESH_TOKEN, { config, baseURL });

  const { data: response, error } = apiResponse;

  if (response) {
    const { accessToken, userDetails, refreshToken } = response;
    localStorage.setItem(BROWSER_STORAGE.ACCESS_TOKEN, accessToken);
    localStorage.setItem(BROWSER_STORAGE.REFRESH_TOKEN, refreshToken);
    yield put({ type: ACTION_TYPES.REFRESH_TOKEN_SUCCESS, payload: { accessToken, userDetails } });
    yield put(loaderNotify({ title: "Authenticating", id: "refresh_success" }));
    yield delay(1000);
    yield put(dismissNotification("refresh_success"));
  } else {
    yield put({ type: ACTION_TYPES.REFRESH_TOKEN_FAILURE, error });
    yield put(logout());
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(ACTION_TYPES.LOGIN, login),
    takeLatest(ACTION_TYPES.REGISTER, register),
    takeLatest(ACTION_TYPES.REFRESH_TOKEN, refreshTokenSaga)
  ]);
}
