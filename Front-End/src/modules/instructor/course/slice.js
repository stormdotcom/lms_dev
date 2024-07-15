import { createSlice } from "@reduxjs/toolkit";
import { STATE_REDUCER_KEY } from "./constants";
import _ from "lodash";
import { ACTION_TYPES } from "./actions";
import { formatResponse } from "../../../utils/apiUtils";
import { formatToCourseDetails } from "./utils";

const initialState = {
    courseDetails: {
        requestInProgress: false,
        uploadInProgress: false,
        data: {
            id: 0,
            slug: "",
            title: "",
            description: "",
            category: "",
            level: "",
            thumbnailUrl: "",
            language: "",
            tags: [""],
            options: {
                requirements: ["... ."]
            }
        }
    },
    lectureDetails: {
        buttonDisabled: true,
        requestInProgress: false,
        uploadInProgress: false,
        data: {
            id: null,
            title: "",
            slug: "",
            description: "",
            category: "",
            thumbnailUrl: "",
            lectures: [
                {
                    title: "...", disabled: false, sourceUrl: "", attachments: [""]
                }
            ]
        }
    },
    dropDown: {
        requestInProgress: false,
        data: {
            tags: ["cyber-security", "web-development", "android-development", "ios-development", "data-science"],
            level: ["Beginner", "Intermediate", "Advanced"],
            language: ["English", "Arabic", "Malayalam", "Hindi", "Tamil"]
        }
    },
    attachments: [],
    thumbnail: null,
    thumbnailUrl: "",
    videoKey: "videos/test/file_example_MP4_640_3MG.mp4 ",
    videoUrl: "",
    courses: {
        pagination: {
            pageNo: 1,
            pageSize: 7,
            totalPages: 0
        },
        requestInProgress: false,
        data: []
    },
    courseDetailsById: {
        requestInProgress: false,
        data: {}
    },
    videosList: {
        requestInProgress: false,
        data: []
    },
    isEditing: false
};


const slice = createSlice({
    initialState,
    name: STATE_REDUCER_KEY,
    reducers: {
        clearAll: () => initialState,
        setImage: (state, { payload }) => {
            state.thumbnail = payload;
        },
        updateLecture: (state, { payload }) => {
            const { index, title } = payload;
            _.set(state, `lectureDetails.data.lectures.${index}.title`, title);
        },
        setPagination: (state, { payload }) => {
            state.courses.pagination.pageNo = payload;
        },
        setVideoKey: (state, { payload }) => {
            state.videoKey = payload;
        },
        setAttachMents: (state, { payload }) => {

            state.attachments.push(payload);
        },
        fetchLectureSuccess: (state, { payload }) => {
            state.videoUrl = payload;
        },
        setCourseEdit: (state, { payload }) => {
            state.isEditing = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTION_TYPES.UPLOAD_THUMBNAIL_IMAGE_SUCCESS, (state, { payload }) => {
                state.thumbnailUrl = payload.data;
                state.courseDetails.data.thumbnailUrl = payload.data;
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_REQUEST, (state) => {
                state.courses.requestInProgress = true;
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_SUCCESS, (state, { payload }) => {
                state.courses.data = payload.data;
                state.courses.pagination = formatResponse(payload);
                state.courses.requestInProgress = false;
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_FAILURE, (state) => {
                state.courses.requestInProgress = false;
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_BY_ID_REQUEST, (state) => {
                state.courseDetailsById.requestInProgress = true;
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_BY_ID_SUCCESS, (state, { payload }) => {
                state.courseDetailsById.requestInProgress = false;
                state.courseDetailsById.data = payload.data;
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_BY_ID_FAILURE, (state) => {
                state.courseDetailsById.requestInProgress = false;
            })
            .addCase(ACTION_TYPES.FETCH_VIDEOS_BY_SLUG_REQUEST, (state) => {
                state.videosList.requestInProgress = true;
            })
            .addCase(ACTION_TYPES.FETCH_VIDEOS_BY_SLUG_SUCCESS, (state, { payload }) => {
                state.videosList.requestInProgress = false;
                state.videosList.data = payload.data;
            })
            .addCase(ACTION_TYPES.FETCH_VIDEOS_BY_SLUG_FAILURE, (state) => {
                state.videosList.requestInProgress = false;
            })
            .addCase(ACTION_TYPES.CREATE_COURSE_REQUEST, (state) => {
                state.courseDetails.requestInProgress = true;
            })
            .addCase(ACTION_TYPES.CREATE_COURSE_SUCCESS, (state, { payload }) => {
                state.courseDetails.requestInProgress = false;
                state.lectureDetails.data = payload.data;
            })
            .addCase(ACTION_TYPES.CREATE_COURSE_FAILURE, (state) => {
                state.courseDetails.requestInProgress = false;
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_BY_SLUG_REQUEST, (state) => {
                state.lectureDetails.requestInProgress = true;
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_BY_SLUG_SUCCESS, (state, { payload }) => {
                state.lectureDetails.requestInProgress = false;
                state.lectureDetails.data = payload.data;
                state.lectureDetails.buttonDisabled = false;
                state.courseDetails.data = formatToCourseDetails(payload.data);
            })
            .addCase(ACTION_TYPES.FETCH_COURSE_BY_SLUG_FAILURE, (state) => {
                state.lectureDetails.requestInProgress = false;
            })
            .addCase(ACTION_TYPES.SENT_COMPLETE_SUCCESS, (state, { payload }) => {
                const { video: { videoNo, title } = {}, sourceUrl } = payload.data;
                _.set(state, `lectureDetails[${videoNo}].sourceUrl`, sourceUrl);
                _.set(state, `lectureDetails[${videoNo}].disabled`, true);
                _.set(state, `lectureDetails[${videoNo}].title`, title);
            });
    }
});

export const { actions, reducer } = slice;
