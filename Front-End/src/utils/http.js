/* eslint-disable no-case-declarations */
import { createAction } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from "../@app/axios";
import _ from "lodash";
import { call, delay, put, take } from "redux-saga/effects";
import { errorNotify, warningNotify } from "./notificationUtils";
import { BROWSER_STORAGE, HTTP as HTTP_CONSTANTS, REQUEST_METHOD } from "../common/constants";
import { logout } from "../modules/common/actions";
import AUTH_URL from "../modules/user-management/auth/apiUrls";
import { ACTION_TYPES, refreshToken } from "../modules/user-management/auth/actions";


const HTTP_RESPONSE_STATUS = {
    BAD_REQUEST: 400,
    VALIDATION_ERROR: 422,
    UN_AUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const ERROR_CODE = {
    INVALID_TOKEN: 9401,
    TOKEN_REQUIRED: 9402,
    JWT_TOKEN_EXPIRED: 9000
};

const requestWrapper = (body = {}) => body;

export const generateListedErrors = (array = []) => {
    if (array.length > 1) {
        const joinedMessages = _.join(_.map(array, "message"), "</li><li>");
        return joinedMessages;
    } else {
        return _.head(array).message;
    }
};

export const getRequestParams = ({ url, data, method }) => {
    let headers = { ...HTTP_CONSTANTS.HTTP_HEADERS }; // Ensure headers is a new object
    let baseURL = process.env.REACT_APP_API_URL || "";
    let authHeaders = {};
    let bearerToken = localStorage.getItem(BROWSER_STORAGE.ACCESS_TOKEN);
    let extraParams = {};
    let api;

    if (bearerToken) {
        authHeaders = { Authorization: `Bearer ${bearerToken}` };
    }

    switch (method) {
        case REQUEST_METHOD.DELETE:
            api = deleteRequest;
            break;
        case REQUEST_METHOD.PUT:
            api = putRequest;
            break;
        case REQUEST_METHOD.PATCH:
            api = patchRequest;
            break;
        case REQUEST_METHOD.POST:
            api = postRequest;
            break;
        case REQUEST_METHOD.FILE:
            api = putRequest;
            headers["Content-Type"] = "multipart/form-data";
            const formData = new FormData();
            formData.append("file", data, data.name);
            return { config: { headers: { ...headers, ...authHeaders }, ...extraParams }, baseURL, data: formData, api };
        case REQUEST_METHOD.VIDEO:
            api = getRequest;
            let { range, ...rest } = data;
            baseURL = process.env.REACT_APP_UPLOAD_SERVER;
            headers.Range = range; // Add the Range header
            return { config: { headers: { ...headers, ...authHeaders }, ...extraParams, responseType: "blob" }, baseURL, data: rest, api };
        default:
            api = getRequest;
    }

    headers["Content-Type"] = "application/json";

    if ((method === REQUEST_METHOD.PUT || method === REQUEST_METHOD.PATCH || method === REQUEST_METHOD.POST) && url !== AUTH_URL.AUTH.SIGN_IN) {
        data = requestWrapper(data);
    }

    return { config: { headers: { ...headers, ...authHeaders }, ...extraParams }, baseURL, data, api };
};

export const API_RESULT_CODE = {
    SUCCESS: 1,
    FAILURE: 0
};

function* invokeApi(method, url, payload, retryCount = 1) {
    const { types = ["REQUEST", "SUCCESS", "FAILURE"], data: payloadData } = payload;
    const requestAction = createAction(types[0]);
    const successAction = createAction(types[1]);
    const failureAction = createAction(types[2]);

    yield put(requestAction());
    const { api, config, baseURL, data } = getRequestParams({ url, data: payloadData, method });
    const apiResponse = yield call(api, url, { config, baseURL, data });
    const { data: response, error } = apiResponse;
    if (error) {
        const {
            message: netWorkMessage,
            code: id,
            response: {
                status,
                statusText,
                data: {
                    details = [],
                    errorCode,
                    errorTitle,
                    message,
                    name: resultString
                } = {}
            } = {}
        } = error;
        let errorMessage = {};
        switch (status) {
            case HTTP_RESPONSE_STATUS.BAD_REQUEST:
                errorMessage = { title: `${resultString || "ERROR"}`, message };
                yield put(failureAction({ error }));
                yield put(errorNotify({ id, ...errorMessage }));
                break;
            case HTTP_RESPONSE_STATUS.VALIDATION_ERROR:
                errorMessage = { title: `${resultString || "Bad Request"}`, message: `<ul><li>${generateListedErrors(details)}</li></ul>` };
                yield put(failureAction({ error }));
                yield put(errorNotify({ id, ...errorMessage }));
                break;
            case HTTP_RESPONSE_STATUS.UN_AUTHORIZED:
                {
                    if (errorCode === ERROR_CODE.JWT_TOKEN_EXPIRED && retryCount > 0) {
                        yield put(refreshToken());
                        yield take([ACTION_TYPES.REFRESH_TOKEN_SUCCESS]);
                        yield delay(500);
                        const newBearerToken = localStorage.getItem(BROWSER_STORAGE.ACCESS_TOKEN);
                        if (newBearerToken) {
                            // Retry the original request with the new token
                            return yield call(invokeApi, method, url, payload, retryCount - 1);
                        } else {
                            errorMessage = { title: "Token Expired", message: "Please login again." };
                            yield put(logout());
                        }
                    } else if (errorCode === ERROR_CODE.INVALID_TOKEN) {
                        errorMessage = { title: "Invalid Token", message: "Please login again." };
                        yield delay(500);
                        yield put(logout());
                    } else {
                        errorMessage = { title: `${errorTitle || statusText || netWorkMessage || "ERROR"}`, message: message };
                        yield put(logout());
                    }
                }
                break;
            case HTTP_RESPONSE_STATUS.NOT_FOUND:
            case HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR:
                errorMessage = { title: "Error", message: message || resultString || netWorkMessage };
                yield put(failureAction({ error }));
                yield put(errorNotify({ id, ...errorMessage }));
                break;
            default:
                errorMessage = { title: `${status || ""} ${id || "ERROR"}`, message: resultString || message };
                yield put(failureAction({ error }));
                yield put(errorNotify({ id, ...errorMessage }));
                break;
        }
    } else {
        if (_.get(response, "result", "") === API_RESULT_CODE.FAILURE) {
            yield put(warningNotify({ id: "ERROR_PRIMARY", title: "Operation Failure", message: _.get(response, "errorDescription", "Operation Failure") }));
            yield put(failureAction({}));
        }
        if (_.get(response, "result", "") !== API_RESULT_CODE.FAILURE) {
            yield put(successAction(response || {}));
        }
    }
    return { response, error };
}

export function* handleAPIRequest(apiFn, ...rest) {
    let { method, url, payload } = apiFn(...rest);
    return yield call(invokeApi, method, url, payload, 1);
}
