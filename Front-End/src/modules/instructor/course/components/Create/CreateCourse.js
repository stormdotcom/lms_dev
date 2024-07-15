import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormController, LoadingCustomOverlay } from "../../../../../common/components";
import { createCourseValidation } from "../../validate";
import { createCourse, editCourse, uploadThumbnailImage } from "../../actions";
import { STATE_REDUCER_KEY } from "../../constants";
import ThumbnailUpload from "./ThumbnailUpload";
import { verifyFile } from "../../../../../utils/commonUtils";
import { HiTemplate } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { actions as sliceActions } from "../../slice";

const CreateCourse = ({ isEditing = false }) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state[STATE_REDUCER_KEY].courseDetails.data);
    const requestInProgress = useSelector(state => state[STATE_REDUCER_KEY].courseDetails.requestInProgress);
    const uploadInProgress = useSelector(state => state[STATE_REDUCER_KEY].courseDetails.uploadInProgress);
    const { tags, level, language } = useSelector(state => state[STATE_REDUCER_KEY].dropDown.data);
    const [fileError, setFileError] = useState("");
    const [isFile, setIsFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [preview, setPreview] = useState(null);


    const {
        handleSubmit,
        control,
        register
    } = useForm({
        resolver: yupResolver(createCourseValidation),
        defaultValues: { ...data, requirements: data.options.requirements }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "requirements"
    });

    const onSubmit = (formData) => {
        isEditing ?
            dispatch(editCourse({ thumbnailUrl: data?.thumbnailUrl, ...formData }))
            :
            dispatch(createCourse({ thumbnailUrl: data?.thumbnailUrl, ...formData }));
    };

    const handleImage = (e) => {
        setFileError("");
        setIsFile(false);
        let files = e.target.files;
        setPreview(files[0]);
        if (files && files.length > 0) {
            const { isVerified, message = "", currFileName = "" } = verifyFile(files);
            if (isVerified) {
                // eslint-disable-next-line no-unused-vars
                const file = files[0];
                dispatch(sliceActions.setImage(file));
                setIsFile(file);
                setFileName(currFileName);
            } else {
                setIsFile(false);
                setFileError(message);
            }
        }
    };
    const handleUpload = () => {
        dispatch(uploadThumbnailImage());
        setIsFile(null);
    };
    return (
        <div>
            <p className="text-xl font-bold text-secondary">
                {isEditing ? "Edit Course" : "Create Course"}
            </p>
            <div>
                <LoadingCustomOverlay active={requestInProgress}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="border p-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">

                            <div>
                                <FormController
                                    controlType="input"
                                    control={control}
                                    name="title"
                                    placeholder="Course Title"
                                />
                                <FormController
                                    controlType="textarea"
                                    control={control}
                                    name="description"
                                    placeholder="Description"
                                />
                                <div>

                                </div>
                            </div>
                            <div>
                                <LoadingCustomOverlay active={uploadInProgress} spinnerProps="upload">
                                    <div className="">
                                        <label className="block font-bold mb-1">Course Thumbnail</label>
                                        <div className="flex justify-center items-center flex-col space-x-4">
                                            {data.thumbnailUrl ? (
                                                <img
                                                    src={data.thumbnailUrl || fileName}
                                                    alt={data.tile}
                                                    className="w-28 h-28 rounded"
                                                />
                                            ) : preview ? <img
                                                src={URL.createObjectURL(preview)}
                                                alt={"uploaded-course-thumbnail-image"}
                                                className="w-28 h-28 rounded"
                                            /> : (
                                                <div className="flex items-center justify-center bg-gray-200 rounded">
                                                    <HiTemplate className="w-20 h-20 text-gray-400" />
                                                </div>
                                            )}
                                            <ThumbnailUpload
                                                handleImage={handleImage}
                                                fileError={fileError}
                                                handleUpload={handleUpload}
                                                isFileExists={isFile}
                                                fileName={fileName}
                                            />
                                        </div>
                                    </div>
                                </LoadingCustomOverlay>
                            </div>

                        </div>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border p-2 mt-2">
                            <FormController
                                controlType="input"
                                control={control}
                                name="category"
                                label="Category"

                            />
                            <FormController
                                controlType="select"
                                control={control}
                                name="level"
                                label="Difficulty Level"
                                options={level || []}
                            />
                            <FormController
                                controlType="select"
                                control={control}
                                name="language"
                                label="Language"
                                options={language || []}
                            />

                            <FormController
                                controlType="select"
                                control={control}
                                name="tags"
                                label="Tags"
                                options={tags || []}
                                multiple={true}
                            />
                        </div>
                        <div className="border p-2 mt-4">
                            <p className="font-bold text-secondary mb-2">Pre Requirements for course </p>
                            {fields.map((item, index) => (
                                <div key={item.id} className="mb-2 flex items-center">
                                    <input
                                        {...register(`requirements.${index}`)}
                                        placeholder={`Requirement No-${index + 1}`}
                                        className="w-full p-2 border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="ml-2 p-2 text-red-500"
                                    >
                                        <IoClose className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <div className="flex justify-start space-x-1">
                                <Button
                                    variant="bordered-primary"
                                    type="button"
                                    onClick={() => append("")}
                                >
                                    Add Course Requirement Details
                                </Button>
                                <Button
                                    variant="bordered-primary"
                                    type="button"
                                    onClick={() => remove(fields.length - 1)}
                                >
                                    Remove All
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-end my-1 mr-5">
                            <Button type="submit" loader={true} active={requestInProgress} extraClass="pl-8"
                                variant="contained-secondary">
                                {isEditing ? "Update" : "Save & Next"}
                            </Button>
                        </div>
                    </form>
                </LoadingCustomOverlay>
            </div>
        </div>
    );
};

export default CreateCourse;
