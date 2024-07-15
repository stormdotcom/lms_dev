import React from "react";

const SkeletonCourseCardInstructor = ({ key }) => {
    return (
        <div key={key} className="flex-none w-[93%] h-44 bg-gray-200 border-2 border-light-gridBorder p-4 relative cursor-pointer animate-pulse">
            <div className="w-full h-24 rounded-lg bg-gray-300"></div>
            <div className="h-6 bg-gray-300 mt-1 rounded"></div>
            <div className="flex justify-between w-full mt-2">
                <div className="w-1/3">
                    <div className="h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="w-1/3">
                    <div className="h-2 bg-gray-300 rounded"></div>
                    <div className="h-2 bg-gray-300 rounded mt-1"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCourseCardInstructor;
