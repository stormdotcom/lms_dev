import React from "react";

const VideoListSkelton = ({ length = 6 }) => {
    return (
        <>
            {Array.from({ length }).map((_, index) => (
                <li key={index} className="flex justify-between flex-col p-2 bg-white rounded-lg border border-gray-300 animate-pulse">

                    <div className="w-full bg-gray-200 h-4 rounded my-1"></div>
                    <div>
                        <div className="w-1/4 bg-gray-200 h-4 rounded margin-r-auto"></div>
                    </div>
                </li>
            ))}
        </>
    );
};

export default VideoListSkelton;
