import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import ProfileStats from "./ProfileStats";
import CourseOverView from "./CourseOverView";
import LearningProgress from "./LearningProgress";
import AchievementsOverView from "./AchievementsOverView";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY as COMMON } from "../../../../common/constants";

const CourseStats = () => {
    const { userDetails: { firstName = "", lastName = "", options: { bio } = {} } = {} } = useSelector(state => state[COMMON]);

    return (
        <div className="h-[45vh] overflow-y-scroll px-4 py-2 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <UserIcon className="h-16 w-16 text-secondary mr-4" />
                <div>
                    <p className="text-2xl font-bold">{`${firstName} ${lastName}`}</p>
                    <p className="text-sm italic text-secondary">{bio}</p>
                </div>
            </div>

            <ProfileStats />

            <div className="mt-6">
                <p className="text-lg font-semibold mb-2">Enrolled Courses</p>
                <div className="grid grid-cols-1 gap-4">
                    <CourseOverView />
                    <CourseOverView />
                    <CourseOverView />
                </div>
            </div>

            <LearningProgress />
            <AchievementsOverView />
        </div>
    );
};

export default CourseStats;
