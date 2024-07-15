import React from "react";
import { CheckCircleIcon, ChartBarIcon, FireIcon } from "@heroicons/react/24/solid";

const ProfileStats = () => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold flex items-center">
                    <ChartBarIcon className="h-5 w-5 text-secondary mr-2" />
                    Overall Learning Progress
                </p>
                <p className="text-primary">75%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                    className="bg-primary h-4 rounded-full"
                    style={{ width: "75%" }}
                ></div>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-blue-400 mr-2" />
                    Completion Rate
                </p>
                <p className="text-primary">50%</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold flex items-center">
                    <FireIcon className="h-5 w-5 text-yellow-400 mr-2" />
                    23
                </p>
                <p className="text-primary">5 days</p>
            </div>
        </div>
    );
};

export default ProfileStats;
