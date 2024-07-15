import React from "react";
import { VideoCameraIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { formattedDateToLocal } from "../../../../../utils/dateUtils";
import { removeStringPortion } from "../../../../../utils/commonUtils";

const CourseCard = ({ title, thumbnailUrl, instructor, publishedDate, slug }) => {
    const navigate = useNavigate();
    const handleSlug = () => navigate(`../course/${slug}`);
    return (
        <div onClick={handleSlug} className="flex-none w-64 h-44 bg-white-500 border-2 border-light-gridBorder p-4 relative hover:bg-slate-200 cursor-pointer">
            {thumbnailUrl ? (
                <img src={thumbnailUrl} alt={title} className="w-full h-24 rounded-lg object-cover" />
            ) : (
                <VideoCameraIcon className="w-full h-20 text-secondary" />
            )}
            <h2 className="text-secondary font-semibold mt-1">{removeStringPortion(title, 25)}</h2>
            <div className="flex justify-between w-full">
                <div>
                    <p className="text-secondary text-xs"> Instructor</p>
                    <p className="text-secondary font-bold text-xs">  {instructor.firstName + " " + instructor.lastName}</p>
                </div>
                <div>
                    <p className="text-secondary text-xs"> Published Date</p>
                    <p className="text-secondary font-bold text-xs">  {formattedDateToLocal(publishedDate)}</p>
                </div>

            </div>
        </div>
    );
};

export default CourseCard;
