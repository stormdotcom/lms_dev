import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { STATE_REDUCER_KEY } from "../../constants";
import { fetchCourseBySlug, publishCourse } from "../../actions";
import { Button, LoadingCustomOverlay } from "../../../../../common/components";
import { HiArrowCircleDown, HiArrowCircleUp, HiClock } from "react-icons/hi";
import { formatDuration, formattedDateToLocal } from "../../../../../utils/dateUtils";
import RenderAttachment from "./RenderAttachments";
import { actions } from "../../slice";
import VideoListSkelton from "../../../../../common/components/Custom/Skelton/VideoListSkelton";

const EditCourse = () => {
    const data = useSelector(state => state[STATE_REDUCER_KEY].lectureDetails?.data);
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].lectureDetails?.requestInProgress);
    const videosList = useSelector(state => state[STATE_REDUCER_KEY].lectureDetails?.data.lectures);
    const { slug = "" } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCourseBySlug(slug));
        return () => actions.clearAll();
    }, []);
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const toggleAccordion = (index) => {
        if (index === expandedIndex) {
            setExpandedIndex(-1);
        } else {
            setExpandedIndex(index);
        }
    };
    const handleClick = () => dispatch(publishCourse({ slug, courseId: data.id }));
    return (
        <div>
            <p className="text-xl font-bold text-secondary my-1 px-2">Publish Course</p>
            <LoadingCustomOverlay active={requestInProgress}>
                <div className="flex justify- items-center flex-col space-x-4">
                    {data.thumbnailUrl && (
                        <img
                            src={data.thumbnailUrl}
                            alt={data.title}
                            className="w-100 h-[38vh] rounded"
                        />
                    )}
                </div>
                <div>
                    <div className="border p-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        <div className="my-2 1">
                            <div className="my-2">
                                <div className="flex">
                                    <p className="block font-medium text-secondary mb-1 pr-3">{"Course Title"}</p>
                                    <p className="font-bold "> {data?.title}</p>
                                </div>
                                <p className="block text-xs font-medium text-secondary mb-1">{"Created at (Date)"}</p>
                                <p className="text-left  text-secondary text-xs">{formattedDateToLocal(data.createdAt)}</p>
                            </div>

                        </div>
                    </div>
                    <div className="my-2 flex flex-col space-x-1">
                        <p className="block font-medium text-secondary mb-1">{"Description"}</p>
                        <div className="w-full">
                            <p className="p-1 font-sm"> {data?.description}</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h2 className="text-xl font-semibold mb-4">Course content</h2>
                        <ul className="space-y-2 w-50">
                            {requestInProgress ? (
                                <VideoListSkelton length={6} />
                            ) :
                                videosList.map((content, index) => (
                                    <li key={index} className="relative">
                                        <div className="flex justify-between p-2 w-full bg-white rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">

                                            <div className="flex justify-between w-full">
                                                <div>
                                                    <span className="text-lg font-semibold">{content.title}</span>
                                                </div>
                                                <div className="flex pr-2">
                                                    <HiClock className="mt-[3px] pl-1 w-5 h-5" />  <span>{formatDuration(content.duration) || "00.00"}</span>
                                                </div>
                                            </div>
                                            <div
                                                className={`cursor-pointer flex items-center border-l ${expandedIndex === index ? "bg-slate-100 text-grey" : "hover:bg-slate-200"
                                                    } px-2 py-1 rounded`}
                                                onClick={() => toggleAccordion(index)}
                                            >
                                                {expandedIndex === index ? (
                                                    <HiArrowCircleUp className="mr-1" />
                                                ) : (
                                                    <HiArrowCircleDown className="mr-1" />
                                                )}
                                            </div>
                                        </div>
                                        {expandedIndex === index && (
                                            <div className="p-2 bg-gray-100 border border-gray-300 rounded-b-lg flex flex-col ">
                                                <p className="text-sm text-gray-600 mt-2">Course attachments</p>
                                                <div className="flex justify-start overflow-x-auto">
                                                    {/* Additional details/content to show when expanded */}

                                                    {content.attachments ? content.attachments.map((item, idx) => {
                                                        return <div key={idx} >
                                                            <RenderAttachment attachment={item} source="remote" />
                                                        </div>;
                                                    })
                                                        : <p className="text-sm text-gray-600 mt-2">No lecture attachments...</p>}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end my-3 mr-5">
                    <Button onClick={handleClick} loader={true} active={requestInProgress} extraClass="pl-8"
                        variant="contained-secondary">Save & Publish</Button>
                </div>
            </LoadingCustomOverlay>

        </div>
    );
};

export default EditCourse;
