import React, { useEffect } from "react";
import Watch from "./Watch";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../constants";
import { fetchCurrentLecturePlaylist } from "../../actions";

const StartVideo = () => {
    const dispatch = useDispatch();
    const { videoId } = useParams();
    // eslint-disable-next-line no-unused-vars
    const { sourceUrl, videoList, videoNO, title } = useSelector(state => state[STATE_REDUCER_KEY].currentLecture.data);
    const duration = useSelector(state => state[STATE_REDUCER_KEY].currentLecture.duration);

    useEffect(() => {
        dispatch(fetchCurrentLecturePlaylist(videoId));
    }, [dispatch, videoId]);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <Watch url={sourceUrl} videoId={videoId} duration={duration} />
            </div>
            <div className="md:w-64 p-4 overflow-y-auto h-screen md:border-l border-gray-300">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <ul>
                    {videoList.map((video, index) => (
                        <li key={index} className="mb-2 p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer">
                            {video.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StartVideo;
