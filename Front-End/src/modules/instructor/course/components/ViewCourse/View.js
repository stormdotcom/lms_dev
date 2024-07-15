import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";
import { LoadingCustomOverlay } from "../../../../../common/components";
import { convertToHumanReadableDate, formatDuration } from "../../../../../utils/dateUtils";
import { HiPlay } from "react-icons/hi";
import { actions } from "../../slice";

const View = () => {

    const { slug } = useParams();
    const data = useSelector(state => state[STATE_REDUCER_KEY].courseDetailsById.data);
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].courseDetailsById.requestInProgress);
    const videoList = useSelector(state => state[STATE_REDUCER_KEY].videosList.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //         path: "courses/:slug/lecture/:id",
    const handleVideoList = (props) => {

        const { id, options: { meta: { videoKey } = {} } = {} } = props;
        dispatch(actions.setVideoKey(videoKey));
        navigate(`../course/${slug}/lecture/${id}`);

    };
    useEffect(() => {
        dispatch(fetchCourseById(slug));
    }, []);


    return (
        <LoadingCustomOverlay active={requestInProgress} spinnerProps="selectTagProp">
            <div className="flex p-1 mt-2 mb-3 flex-col items-center justify-start ">
                <div className="py-3 w-full border rounded-sm px-2 my-2">
                    <p className="text-left font-bold text-xl text-secondary">{data.title}</p>
                    <p className="text-left text-secondary text-sm">{data.description}</p>
                    <p className="text-left  text-secondary text-xs">{convertToHumanReadableDate(data.createdAt)}</p>
                </div>
                <div className="w-full p-4 overflow-y-auto h-[30%] border-l border-gray-300">

                    <h2 className="text-left font-bold text-xl text-secondary">Course Content List</h2>
                    <ul className="">
                        {videoList.map((video, index) => (
                            <li key={index} className="w-full mb-2 py-4 px-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer " onClick={() => handleVideoList(video)}>
                                <div className="flex justify-space">
                                    <div className="flex col-flex items-stretch">
                                        <div>    {video.id}</div>
                                        <div>
                                            <HiPlay className="w-7 h-7 border-secondary" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="margin-r-auto text-right"> {formatDuration(video.duration)}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </LoadingCustomOverlay>

    );
};

export default View;
