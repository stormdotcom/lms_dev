import React, { useEffect } from "react";
import CourseCardInstructor from "./CourseCardInstructor";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import CustomPagination from "../../../../common/components/Pagination/CustomPagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../actions";
import { STATE_REDUCER_KEY } from "../constants";

import { actions } from "../slice";
import SkeletonCourseCardInstructor from "../../../../common/components/Custom/Skelton/SkeletonCourseCardInstructor";

const Wrapper = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCourses());
    }, []);
    const courses = useSelector(state => state[STATE_REDUCER_KEY].courses.data);
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].courses.requestInProgress);
    const pagination = useSelector(state => state[STATE_REDUCER_KEY]).courses.pagination;
    const handlePageOnChange = (pages) => {
        dispatch(actions.setPagination(pages));
        dispatch(fetchCourses());
    };
    return (
        <div>
            <p className="py-2 mt-3 text-xl font-bold">Course Management </p>
            <div className="my-2 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-opacity duration-500 ease-in-out">
                <div className="cursor-pointer hover:bg-gray-50 flex-none w-[93%] h-44 bg-white-500 border-2 border-light-gridBorder p-4 relative bg-grey-50-hover"
                    onClick={() => navigate("/instructor/courses/create")}
                >
                    <HiOutlineViewGridAdd className="w-full h-20 text-secondary" />

                    <h2 className="text-center text-xl font-bold text-secondary"> Create a Course</h2>
                    <div className="flex justify-between w-full text-center">

                    </div>
                </div>
                {requestInProgress
                    ? Array(7).fill().map((_, index) => <div key={index}>  <SkeletonCourseCardInstructor /> </div>)
                    : courses.map((course, idx) => (
                        <div key={idx}>
                            <CourseCardInstructor
                                title={course.title}
                                thumbnailUrl={course.thumbnailUrl}
                                publishedDate={course.modified}
                                navigate={navigate}
                                slug={course.slug}
                                id={course.id}
                                publish={course.publish}
                            />
                        </div>
                    ))}
            </div>
            <div className="">
                <CustomPagination pagination={pagination} onPageChange={(pages) => handlePageOnChange(pages)} />
            </div>
        </div>

    );
};

export default Wrapper;
