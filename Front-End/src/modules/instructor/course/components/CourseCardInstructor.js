import React from "react";
import { VideoCameraIcon, CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { convertToHumanReadableDate, DATE_FORMAT } from "../../../../utils/dateUtils";

const CourseCardInstructor = ({ key, title, thumbnailUrl, publishedDate, navigate, slug = "", publish }) => {
    return (
        <div
            key={key}
            className="flex-none hover:bg-gray-50 w-[93%] h-44 bg-white-500 border-2 border-light-gridBorder p-4 relative cursor-pointer hover:bg-grey-100"
            onClick={() => navigate(`/instructor/courses/${slug}/view`)}>
            <div className="relative">
                {publish ?
                    <CheckBadgeIcon className="absolute top-[-12px] right-[-12px] text-green-600 w-4 h-4" />
                    :
                    <XMarkIcon className="absolute top-[-12px] right-[-12px] text-red-400 w-4 h-4 border rounded-xl border-red-400" />
                }
            </div>
            {thumbnailUrl ? (
                <img src={thumbnailUrl} alt={title} className="w-full h-24 rounded-lg object-cover" />
            ) : (
                <VideoCameraIcon className="w-full h-20 text-secondary" />
            )}
            <h2 className="text-secondary font-semibold mt-1">{title}</h2>
            <div className="flex justify-between w-full">
                <div>
                    <p className="text-secondary text-xs"> Ratings</p>
                    {/* <p className="text-secondary font-bold text-xs">  {instructor}</p> */}
                </div>
                <div>
                    <p className="text-secondary text-xs">
                        {publish ? "Published Date" : "Created Date"}
                    </p>
                    <p className="text-secondary font-bold text-xs">  {convertToHumanReadableDate(publishedDate, DATE_FORMAT)}</p>
                </div>

            </div>
        </div>
    );
};
export default CourseCardInstructor;
