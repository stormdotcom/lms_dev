import React from "react";
import { CheckCircleIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/24/solid";

const LearningProgress = () => {
    return (
        <div className="mt-6">
            <p className="text-lg font-semibold mb-2">Learning Goals</p>
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-primary mr-1" />
                    Daily Goal
                </p>
                <p className="text-primary">Completed</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm flex items-center">
                    <CalendarIcon className="h-5 w-5 text-primary mr-1" />
                    Weekly Goal
                </p>
                <p className="text-primary">80%</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm flex items-center">
                    <CalendarIcon className="h-5 w-5 text-primary mr-1" />
                    Monthly Goal
                </p>
                <p className="text-primary">50%</p>
            </div>
            <p className="text-lg font-semibold mt-4 mb-2">Summary</p>
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm flex items-center">
                    <ChartBarIcon className="h-5 w-5 text-primary mr-1" />
                    Total Learning Hours
                </p>
                <p className="text-primary">120 hours</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-primary mr-1" />
                    Milestones Achieved
                </p>
                <p className="text-primary">3</p>
            </div>
        </div>
    );
};

export default LearningProgress;
