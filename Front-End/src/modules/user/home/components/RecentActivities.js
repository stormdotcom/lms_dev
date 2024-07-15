import React, { useEffect } from "react";
import { AcademicCapIcon, BookOpenIcon, ClockIcon, ClipboardIcon, ChatBubbleBottomCenterTextIcon, UserCircleIcon, CheckBadgeIcon, DocumentTextIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { EVENT_TYPES } from "../../../../common/constants";
import { STATE_REDUCER_KEY } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import LoadingCustomOverlay from "../../../../common/components/LoadingOverlay/LoadingCustomOverlay";
import { getRelativeTime } from "../../../../utils/dateUtils";
import { fetchRecentActivity } from "../actions";


const getActivityIcon = (activityType) => {
    switch (activityType) {
        case "Course Completion":
            return <AcademicCapIcon className="h-6 w-6 text-primary mr-2" />;
        case "Video":
            return <BookOpenIcon className="h-6 w-6 text-primary mr-2" />;
        case "Milestone":
            return <ClockIcon className="h-6 w-6 text-primary mr-2" />;
        case "Quiz Completion":
            return <ClipboardIcon className="h-6 w-6 text-primary mr-2" />;
        case "Discussion Participation":
            return <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-primary mr-2" />;
        case "Logged Hours":
            return <ClockIcon className="h-6 w-6 text-primary mr-2" />;
        case "Assignment Submission":
            return <DocumentTextIcon className="h-6 w-6 text-primary mr-2" />;
        case "Badge Earned":
            return <CheckBadgeIcon className="h-6 w-6 text-primary mr-2" />;
        case EVENT_TYPES.LOGGED_IN_SESSION:
            return <UserCircleIcon className="h-6 w-6 text-primary mr-2" />;
        case "Certificate Earned":
            return <AcademicCapIcon className="h-6 w-6 text-primary mr-2" />;
        default:
            return <ClockIcon className="h-6 w-6 text-primary mr-2" />;
    }
};

const RecentActivities = () => {
    const dispatch = useDispatch();
    const recentActivities = useSelector(state => state[STATE_REDUCER_KEY].recentActivities.data);
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].recentActivities.requestInProgress);
    useEffect(() => {
        dispatch(fetchRecentActivity());
    }, []);
    return (
        <div className="h-[45vh] font-semibold px-4 py-2 overflow-y-scroll bg-white rounded-lg shadow-md">
            <p className="text-xl font-bold mb-4">Recent Activities</p>
            <LoadingCustomOverlay spinnerProps="notify" active={requestInProgress} >
                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm">
                            {getActivityIcon(activity.activityType)}
                            <div className="flex-1">

                                <p className="text-lg">{activity.activityTitle}</p>
                                <p className="text-sm text-secondary">
                                    {getRelativeTime(activity.lastUpdated)}
                                </p>
                                <div className="mt-2 mr-auto flex">
                                    <CurrencyDollarIcon className="text-yellow-400 h-5 w-5 " />
                                    <p className="text-sm text-secondary pl-1">{activity.score !== null ? ` ${activity.score}` : ""} </p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </LoadingCustomOverlay>
        </div>
    );
};

export default RecentActivities;
