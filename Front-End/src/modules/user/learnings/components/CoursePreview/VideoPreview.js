import React from "react";
import CustomVideoPlayer from "../../../../../common/components/VideoPlayer/CustomVideoPlayer";

const VideoPreview = ({ url, playing }) => {
    return (
        <div className="my-2 p-1">
            <CustomVideoPlayer url={url} playing={playing} />
        </div>
    );
};

export default VideoPreview;
