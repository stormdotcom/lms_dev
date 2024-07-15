/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../constants";
import { API_URL } from "../apiUrls";

const Watch = () => {
    const videoKey = useSelector(state => state[STATE_REDUCER_KEY].videoKey);
    const videoRef = useRef(null);
    const mediaSourceRef = useRef(null);
    const sourceBufferRef = useRef(null);
    const baseURL = process.env.REACT_APP_UPLOAD_SERVER;
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const MIME_TYPE = "video/mp4; codecs=\"avc1.42E01E,mp4a.40.2\"";

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                if (!videoKey) {
                    console.error("videoKey is not defined");
                    return;
                }
                const videoUrl = `${baseURL}/${API_URL.COURSE.STREAM}?videoKey=${videoKey}`;
                initializeMediaSource(videoUrl);
            } catch (error) {
                console.error("Failed to fetch video URL:", error);
            }
        };

        fetchVideoUrl();
    }, [videoKey, baseURL]);

    const initializeMediaSource = (videoUrl) => {
        if (!MediaSource.isTypeSupported(MIME_TYPE)) {
            console.error("MIME type or codecs not supported");
            return;
        }

        const mediaSource = new MediaSource();
        videoRef.current.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener("sourceopen", () => {
            console.log("sourceopen opened");
            onSourceOpen(mediaSource, videoUrl);
        });
        mediaSourceRef.current = mediaSource;
    };

    const onSourceOpen = (mediaSource, videoUrl) => {
        console.log("onSourceOpen opened");
        try {
            const sourceBuffer = mediaSource.addSourceBuffer(MIME_TYPE);
            sourceBufferRef.current = sourceBuffer;
            fetchChunk(videoUrl, 0);

            sourceBuffer.addEventListener("updateend", () => {
                console.log("updateend opened");
                if (mediaSource.readyState === "open" && mediaSource.duration === Infinity) {
                    mediaSource.duration = videoRef.current.duration;
                }
            });
        } catch (error) {
            console.error("Failed to add source buffer:", error);
        }
    };

    const fetchChunk = async (videoUrl, start) => {
        const headers = new Headers();
        headers.append("Range", `bytes=${start}-${start + CHUNK_SIZE - 1}`);

        try {
            const response = await fetch(videoUrl, { headers });
            const data = await response.arrayBuffer();

            if (response.ok) {
                sourceBufferRef.current.appendBuffer(data);
                if (data.byteLength === CHUNK_SIZE) {
                    fetchChunk(videoUrl, start + CHUNK_SIZE);
                }
            } else {
                console.error(`Failed to fetch chunk: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching chunk:", error);
        }
    };
    const handleVideoError = (e) => {
        console.error("Video error:", e);
        const videoError = videoRef.current?.error;
        if (videoError) {
            console.error(`Video error code: ${videoError.code}, message: ${videoError.message}`);
        }
    };
    return (
        <>
            <video
                ref={videoRef}
                controls
                style={{ width: "100%" }}
                onError={handleVideoError}
                onStalled={(e) => console.error("Video stalled:", e)}
                onWaiting={(e) => console.log("Video waiting:", e)}
            >
                Your browser does not support the video tag.
            </video>
        </>
    );
};

export default Watch;

