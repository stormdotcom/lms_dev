import React from "react";

const CardSkeleton = ({ length = 6 }) => {
    return (
        Array.from({ length: length }).map((_, index) => (
            <div key={index} className="margin-auto h-[140px] flex w-full items-center bg-gray-300 shadow-sm p-6 animate-pulse">
                <div className="w-10 h-10 mr-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="flex flex-col justify-center">
                    <div className="w-24 h-5 mb-2 bg-gray-500 animate-bounce"></div>
                    <div className="w-16 h-10 bg-gray-500 animate-bounce"></div>
                </div>
            </div>
        ))

    );
};

export default CardSkeleton;
