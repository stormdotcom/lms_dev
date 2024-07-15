import React from "react";

const VideoPlayerOverlay = ({ videoSrc, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl p-4">
                <video controls className="w-full h-auto">
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
                >
                    X
                </button>
            </div>
        </div>
    );
};
export default VideoPlayerOverlay;
