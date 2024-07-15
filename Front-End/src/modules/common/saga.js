
import { all, put, select, takeEvery, takeLatest, delay, call } from "redux-saga/effects";

import { ACTION_TYPES, sentEvent } from "./actions";

// import { downloadFileAsync } from "utils/commonUtils";
import { BROWSER_STORAGE } from "../../common/constants";
import { getNavigator } from "./selectors";

import { successNotify } from "../../utils/notificationUtils";
import { handleAPIRequest } from "../../utils/http";
import { eventApi } from "./api";
import { actions } from "./slice";

function* navigateToFn({ payload = "/" }) {
  const navigate = yield select(getNavigator);
  if (navigate instanceof Function) {
    yield navigate(payload);
  } else {
    // eslint-disable-next-line no-console
    console.error("navigate function not found");
  }

}
function* refreshFn() {
  const navigate = yield select(getNavigator);
  yield navigate(0);
}
function* logoutUser({ payload: data = {} }) {
  if (data.isManual) {
    yield delay(500);
    yield put(sentEvent({ type: "logged_out" }));
    yield put(successNotify({ title: "Logging Out", message: "Please wait" }));
  }
  yield put(actions.clearUserDetails());
  localStorage.removeItem(BROWSER_STORAGE.ACCESS_TOKEN);
  localStorage.removeItem(BROWSER_STORAGE.REFRESH_TOKEN);
  yield navigateToFn({ payload: "/login" });
  // clear all slice modules;
  // yield put(navigateTo("/"));
}


function* eventSaga({ payload }) {
  yield call(handleAPIRequest, eventApi, payload);
}

export default function* homeSaga() {
  yield all([
    yield takeLatest(ACTION_TYPES.LOG_OUT, logoutUser),
    yield takeEvery(ACTION_TYPES.NAVIGATE_TO, navigateToFn),
    yield takeEvery(ACTION_TYPES.REFRESH_CURRENT_PATH, refreshFn),
    yield takeLatest(ACTION_TYPES.EVENT, eventSaga)
  ]);
}
