import React, { forwardRef } from "react";
import ReactPlayer from "react-player";
import { VIDEO_PLAYER_CONFIG } from "../../../modules/common/constants";

const CustomVideoPlayer = forwardRef(({ url, playing = false, controls = true, stream = false, videoUrl, onProgress = () => { }, onStart }, ref) => {
    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg">
            <ReactPlayer
                ref={ref}
                url={stream ? videoUrl : url}
                className="react-player"
                width="100%"
                height="95%"
                controls={controls}
                playing={playing}
                config={VIDEO_PLAYER_CONFIG}
                onProgress={onProgress}
                onStart={onStart}
            />
        </div>
    );
});

export default CustomVideoPlayer;
