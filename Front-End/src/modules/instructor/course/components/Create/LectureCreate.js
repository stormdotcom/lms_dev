import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCloudUploadAlt, FaRegFileWord } from "react-icons/fa";

import { deleteLectureVideo, fetchCourseBySlug, uploadAttachments, deleteCourse } from "../../actions";
import { STATE_REDUCER_KEY, TWO_MB_IN_BYTES } from "../../constants";
import { createLecture } from "../../validate";
import { Button, LoadingCustomOverlay } from "../../../../../common/components";

import VideoUploadComponent from "./VideoUploadComponent";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import RenderAttachment from "./RenderAttachments";
import { actions } from "../../slice";
import { docMimeTypes, verifyFile } from "../../../../../utils/commonUtils";
import EditingOverlay from "./EditingOverlay";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";


const LectureCreate = () => {
    const dispatch = useDispatch();
    const [fileError, setFileError] = useState("");
    const data = useSelector(state => state[STATE_REDUCER_KEY].lectureDetails?.data);
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].lectureDetails?.requestInProgress);
    const lectures = useSelector(state => state[STATE_REDUCER_KEY].lectureDetails?.data.lectures);
    const attachments = useSelector(state => state[STATE_REDUCER_KEY].attachments) | [];
    const button = useSelector(state => state[STATE_REDUCER_KEY].lectureDetails.buttonDisabled);
    const isEditing = useSelector(state => state[STATE_REDUCER_KEY].isEditing);
    const { slug = "" } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchCourseBySlug(slug));
        return () => dispatch(actions.clearAll());
    }, []);

    const {

        control } = useForm({
            resolver: yupResolver(createLecture),
            values: { lectures: data?.lectures || [] }
        });
    const handleClick = () => navigate("publish");
    const { fields, append, remove } = useFieldArray({
        control,
        name: "lectures"
    });

    const fileInputRef = useRef(null);

    const handleAttachments = (index) => {
        if (lectures[index]) {
            fileInputRef.current.click();
        }

    };
    // docMimeTypes
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileError("");
        let files = event.target.files;
        if (files && files.length > 0) {
            const { isVerified, message = "" } = verifyFile(files, TWO_MB_IN_BYTES, docMimeTypes);
            if (isVerified) {
                dispatch(actions.setAttachMents(file));
            } else {
                setFileError(message);
            }
        }

    };
    const handleAttachmentsUpload = (field) => {
        if (lectures[field.index]) {
            dispatch(uploadAttachments(field));
        }

    };
    const openEdit = () => {
        dispatch(actions.setCourseEdit(true));
    };
    const handleDelete = (id) => dispatch(deleteCourse(id));

    return (
        <div>
            <div>
                <p className="text-xl font-bold text-secondary">Add Lectures</p>
                <LoadingCustomOverlay active={requestInProgress}>
                    {!isEditing && <div className="flex justify-end items-center gap-2">
                        <div className="border rounded-sm flex justify-evenly items-center px-2 cursor-pointer" onClick={openEdit}>
                            <p className="text-sm mr-2">Edit Details</p>  <PencilIcon className="w-3 h-3 text-primary" />
                        </div>
                        <div className="border rounded-sm flex justify-evenly items-center px-2 cursor-pointer" onClick={() => handleDelete(data)}>
                            <p className="text-sm mr-2 ">Delete Course</p>  <XMarkIcon className="w-4 h-4 font-bold text-red-500" />
                        </div>
                    </div>}
                    <div>
                        {isEditing ? <div>
                            <EditingOverlay />
                        </div>
                            : <>
                                <div className="border p-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">

                                    <div className="my-2 1">
                                        <div className="my-2 flex justify-start space-x-1">
                                            <p className="block font-medium text-secondary mb-1">{"Course Title"}</p>
                                            <p className="font-bold "> {data?.title}</p>
                                        </div>

                                    </div>
                                    <div>
                                        <div className="">
                                            <p className="block font-medium text-secondary mb-1">{"Course Thumbnail"}</p>
                                            <div className="flex justify-center items-center flex-col space-x-4">
                                                {data.thumbnailUrl && (
                                                    <img
                                                        src={`${data.thumbnailUrl}?dummy=${data.id}`}
                                                        alt={data.title}
                                                        className="w-28 h-28 rounded"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2 flex flex-col space-x-1">
                                    <p className="block font-medium text-secondary mb-1">{"Description"}</p>
                                    <div className="w-full">
                                        <p className="p-1 font-sm"> {data?.description}</p>
                                    </div>
                                </div>
                            </>}
                        <form >
                            <div className="mt-4">
                                <p className="text-xl font-bold text-secondary">Lectures</p>
                                {fields.map((field, index) => (
                                    <div key={index} className="relative flex flex-col mb-4 border border-secondary p-4 rounded">
                                        <div className="w-full">
                                            <div className="pb-2">
                                                <p className="block font-medium text-secondary mb-1">{`Lecture Video #${index + 1}`}</p>

                                            </div>
                                            {field.sourceUrl ?
                                                <div className="flex justify-center items-start flex-col">
                                                    <div>
                                                        <p className="p-2  text-lg font-bold">{data.title}</p>
                                                    </div>
                                                    <video preload="metadata" src={field.sourceUrl} className="border rounded-lg w-full h-[200px]"
                                                        height={"250px"} width={"800px"} controls controlsList="nodownload" />
                                                </div>
                                                : <div>
                                                    <VideoUploadComponent
                                                        index={index}
                                                        videoNo={index + 1}
                                                        slug={data.slug}
                                                        id={data.id}
                                                    />
                                                </div>}


                                        </div>
                                        <div className="my-4">
                                            <p className="text-sm text-secondary">Attachments</p>
                                            <div className="flex justify-start flex-wrap">
                                                {lectures[index] && lectures[index]?.attachments?.map((attachment, idx) => (
                                                    <div key={idx} >
                                                        <RenderAttachment attachment={attachment} source="remote" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-center flex-wrap">
                                                {(attachments.length > 0) && attachments.map((attachment, idx) => (
                                                    <div key={idx} >
                                                        <RenderAttachment attachment={attachment} source="local" />
                                                    </div>
                                                ))}
                                            </div>
                                            {fileError && <p className="text-red-400 text-sm">{"* " + fileError}</p>}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                                multiple
                                            />
                                            <div className="flex justify-evenly items-center">
                                                <Button type="button" disabled={button} onClick={() => handleAttachments(index)} variant="bordered-primary" extraClass="text-sm">
                                                    <FaRegFileWord className="w-5 h-5" />
                                                    <span className="pl-1">Add course attachments</span>
                                                </Button>
                                                <Button type="button" disabled={button} onClick={() => handleAttachmentsUpload({ videoNo: index + 1, index, slug })} variant="bordered-primary" extraClass="text-sm">
                                                    <FaCloudUploadAlt className="w-5 h-5" />
                                                    <span className="pl-1">Upload Attachments</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="absolute top-2 right-4">
                                            <Button type="button" onClick={() => {
                                                remove(index);
                                                if (field.sourceUrl || data.lectureDetails.lectures[index].sourceUrl) {
                                                    dispatch(deleteLectureVideo({ ...field, videoNo: index + 1 }));
                                                }
                                            }} variant="border-secondary" extraClass="border-lg text-xs flex">
                                                <IoCloseCircle className="text-red-400 mt-[3px]" />
                                                Remove Lecture
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" onClick={() => append({ title: "", disabled: false, sourceUrl: "", attachments: [""] })} variant="bordered-primary">
                                    Add New Lecture
                                </Button>
                            </div>
                            <div className="flex justify-end my-1 mr-5">
                                <Button onClick={handleClick} loader={true} active={requestInProgress} extraClass="pl-8"
                                    variant="contained-secondary">Save & Next</Button>
                            </div>
                        </form>
                    </div>
                </LoadingCustomOverlay>
            </div>
        </div>
    );
};

export const AttachmentFieldArray = ({ nestIndex, control, register }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `lectures.${nestIndex}.attachments`
    });

    return (
        <div>
            {fields.map((field, k) => (
                <div key={field.id} className="flex items-center mb-2">
                    <input
                        {...register(`lectures.${nestIndex}.attachments.${k}`)}
                        type="file"
                        className="border p-2 rounded mr-2 flex-1"
                    />
                    <Button type="button" onClick={() => remove(k)} variant="bordered-primary">
                        Remove
                    </Button>
                </div>
            ))}
            <Button type="button" onClick={() => append("")} variant="bordered-primary" extraClass="text-sm">
                <FaRegFileWord className="w-5 h-5" /> <span className="pl-1">Add course attachments</span>
            </Button>
        </div>
    );
};

export default LectureCreate;
