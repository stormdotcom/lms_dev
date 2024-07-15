import React, { useEffect, useRef, useState } from "react";
import CustomVideoPlayer from "../../../../../common/components/VideoPlayer/CustomVideoPlayer";
import { useDispatch } from "react-redux";
import { sentEvent } from "../../../../common/actions";
import { EVENT_TYPES } from "../../../../../common/constants";

const Watch = ({ url, videoId, duration }) => {
    const dispatch = useDispatch();
    const playerRef = useRef(null);
    const latestPlayedSecondsRef = useRef(0);
    const [tracking, setTracking] = useState(false);

    const onProgress = ({ playedSeconds }) => {
        if (tracking) {
            latestPlayedSecondsRef.current = playedSeconds;
        }
    };

    const onStart = () => {
        setTracking(true);
        if (playerRef.current && !isNaN(duration) && isFinite(duration)) {
            playerRef.current.seekTo(duration, "seconds");
        } else {
            // eslint-disable-next-line no-console
            console.error("Invalid duration:", duration);
        }
    };

    useEffect(() => {
        let interval;

        if (tracking) {
            interval = setInterval(() => {
                dispatch(sentEvent({ type: EVENT_TYPES.PROGRESS_UPDATE, durationInSeconds: latestPlayedSecondsRef.current, videoId }));
            }, 2000);
        }

        return () => clearInterval(interval); // Clean up on component unmount
    }, [dispatch, tracking]);

    return (
        <div>
            <CustomVideoPlayer
                ref={playerRef}
                url={url}
                playing={true}
                onProgress={onProgress}
                onStart={onStart}
                duration={duration}
            />
        </div>
    );
};

export default Watch;
