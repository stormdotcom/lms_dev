import React from "react";
import { PlayIcon, CalendarIcon } from "@heroicons/react/24/solid";

const CourseOverView = () => {
    return (
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold">Course Title</p>
                <div className="flex items-center">
                    <span className="text-secondary">In Progress</span>
                    <button className="ml-2 px-2 py-1 bg-primary text-white rounded-full flex items-center">
                        <PlayIcon className="h-5 w-5 mr-1" />
                        Resume
                    </button>
                </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "40%" }}
                ></div>
            </div>
            <p className="text-sm text-secondary flex items-center">
                <CalendarIcon className="h-5 w-5 mr-1" />
                Due Date: 2023-12-31
            </p>
        </div>
    );
};

export default CourseOverView;
