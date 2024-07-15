import React, { useEffect } from "react";
import CourseCard from "./CourseCard";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";


const CourseList = () => {
    const courses = useSelector(state => state[STATE_REDUCER_KEY].courseList.data);
    const recommendedCourse = useSelector(state => state[STATE_REDUCER_KEY].recommendedCourse.data);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCourses());
    }, []);
    return (
        <div className="p-4 space-y-8">
            {recommendedCourse && <div>
                <div className="flex justify-start py-2">
                    <HandThumbUpIcon className="h-4 w-4 mr-1 text-yellow-400" />
                    <span className="text-md font-semibold">Recommended Courses</span>
                </div>
                <div className="flex items-center space-x-4 overflow-x-scroll w-[98%]">
                    {recommendedCourse.map((course, idx) => <div key={idx}>
                        <CourseCard
                            slug={course.slug}
                            key={course.id}
                            title={course.title}
                            publishedDate={course.updatedAt}
                            thumbnailUrl={course.thumbnailUrl}
                            instructor={course.instructor}
                        />
                    </div>

                    )}
                </div>
            </div>}

            <div>
                <div className="flex justify-start py-2">
                    <span className="text-md font-semibold"> Courses List</span>
                </div>
                <div className="flex items-center space-x-4 overflow-x-scroll w-[98%]">
                    {courses.map((course, idx) => <div key={idx}>
                        <CourseCard
                            slug={course.slug}
                            key={course.id}
                            title={course.title}
                            publishedDate={course.updatedAt}
                            thumbnailUrl={course.thumbnailUrl}
                            instructor={course.instructor}
                        />
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default CourseList;
