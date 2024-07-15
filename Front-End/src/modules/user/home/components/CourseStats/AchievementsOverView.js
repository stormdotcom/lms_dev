import React from "react";
import { StarIcon, CheckBadgeIcon as BadgeCheckIcon } from "@heroicons/react/24/solid";

const AchievementsOverView = () => {
    return (
        <div className="mt-6">
            <p className="text-lg font-semibold mb-2">Achievements</p>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
                    <StarIcon className="h-5 w-5 text-primary mr-2" />
                    <p className="text-sm font-semibold">First Course Completed</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
                    <StarIcon className="h-5 w-5 text-primary mr-2" />
                    <p className="text-sm font-semibold">100 Learning Hours</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
                    <BadgeCheckIcon className="h-5 w-5 text-primary mr-2" />
                    <p className="text-sm font-semibold">Earned Badge</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
                    <BadgeCheckIcon className="h-5 w-5 text-primary mr-2" />
                    <p className="text-sm font-semibold">Certificate of Completion</p>
                </div>
            </div>
        </div>
    );
};

export default AchievementsOverView;
