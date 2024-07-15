import React, { useEffect } from "react";

import VideoPreview from "./VideoPreview";
import Details from "./Details";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { coursePreview } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";
import { LoadingCustomOverlay } from "../../../../../common/components";
import { formatCourseDuration, formatDuration } from "../../../../../utils/dateUtils";
import { HiClock } from "react-icons/hi";
import VideoListSkelton from "../../../../../common/components/Custom/Skelton/VideoListSkelton";
import { sentEvent } from "../../../../common/actions";
import { EVENT_TYPES } from "../../../../../common/constants";

const CoursePreview = () => {
    const courseContent = useSelector(state => state[STATE_REDUCER_KEY].courseDetails.data);
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].courseDetails.requestInProgress);
    const dispatch = useDispatch();
    const { slug } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(coursePreview(slug));
    }, []);
    useEffect(() => {
        if (!requestInProgress && courseContent?.id) {
            const courseWatch = setTimeout(() => {
                dispatch(sentEvent({ type: EVENT_TYPES.COURSE_VISITED, title: courseContent.title, courseId: courseContent.id }));
            }, 10000);

            return () => {
                clearTimeout(courseWatch);
            };
        }
    }, [dispatch, requestInProgress, courseContent]);
    return (
        <div className="max-full mx-auto">
            <div className="max-full mt-6 py-5 px-8 bg-secondary">
                <h1 className="text-3xl font-bold text-white mb-4">{courseContent.title}</h1>
                <LoadingCustomOverlay active={requestInProgress} spinnerProps="video">
                    <VideoPreview url={courseContent.previewUrl} playing={true} />
                </LoadingCustomOverlay >
                <h2 className="text-lg font-bold mb-2 text-white">This course includes:</h2>
                <div className="grid grid-cols-2 gap-1 text-white  mt-3">
                    <div>{courseContent?.duration ? formatCourseDuration(courseContent?.duration) : 0
                    } hours on-demand video</div>
                    <div>14 articles</div>
                    <div>{courseContent.totalAttachments} downloadable resource</div>
                    <div>Full lifetime access</div>
                </div>
            </div>
            <div className="p-6">
                <div className="mt-6 bg-gray-100 border  rounded-lg border-gray-100 px-6 py-2">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Course content</h2>
                        <ul className="space-y-2 w-50">
                            {requestInProgress ? (
                                <VideoListSkelton length={6} />
                            ) :
                                courseContent?.lectures?.map((content, index) => (
                                    <li key={index} className="relative">
                                        <div className="flex justify-between p-2 w-full bg-white rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700" onClick={() => navigate("learn/lecture/" + content.id)}>

                                            <div className="flex justify-between w-full">
                                                <div>
                                                    <span className="text-lg font-semibold">{content.title}</span>
                                                </div>
                                                <div className="flex pr-2">
                                                    <HiClock className="mt-[3px] pl-1 w-5 h-5" />  <span>{formatDuration(content.duration) || "00.00"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <Details data={courseContent?.options} description={courseContent.description} />
            </div>
        </div>
    );
};

export default CoursePreview;
