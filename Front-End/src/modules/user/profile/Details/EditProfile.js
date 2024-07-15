import React, { useEffect, useState } from "react";
import { Button, FormController, LoadingCustomOverlay } from "../../../../common/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import { STATE_REDUCER_KEY } from "../constants";
import { verifyFile } from "../../../../utils/commonUtils";
import { getUserDetails, updateUserDetails, uploadProfileImage } from "../actions";
import { actions, actions as sliceActions } from "../slice";
import { ProfileValidation } from "../validate";

const EditProfile = () => {
    const dispatch = useDispatch();

    const [fileError, setFileError] = useState("");
    const [isFile, setIsFile] = useState(false);
    const [fileName, setFileName] = useState("");
    const profileDetails = useSelector(state => state[STATE_REDUCER_KEY].profileDetails);
    const { data, requestInProgress } = profileDetails;
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(ProfileValidation),
        values: data
    });

    const onSubmit = (formData) => dispatch(updateUserDetails(formData));

    useEffect(() => {
        dispatch(getUserDetails());
        return () => dispatch(actions.clearAll());
    }, [dispatch]);


    const handleImage = (e) => {
        setFileError("");
        setIsFile(false);
        let files = e.target.files;
        if (files && files.length > 0) {
            const { isVerified, message = "", currFileName = "" } = verifyFile(files);
            if (isVerified) {
                const currentFile = files[0];
                dispatch(sliceActions.setImage(currentFile));
                setIsFile(true);
                setFileName(currFileName);
            } else {
                setIsFile(false);
                setFileError(message);
            }
        }
    };

    const handleUpload = () => {
        dispatch(uploadProfileImage());
        setIsFile(false);
    };

    return (
        <div className="overflow-visible p-4">
            <LoadingCustomOverlay active={requestInProgress} spinnerProps="form">
                <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-2 mb-4">
                            <h2 className="text-xl font-bold pl-2">Profile Info</h2>
                            <p className="pl-2 font-bold">Update your profile info here</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 px-2">
                            <div>
                                <label className="font-semi-bold mb-1">First Name</label>
                            </div>
                            <div>
                                <FormController
                                    controlType="input"
                                    control={control}
                                    name="firstName"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label className="block semi-bold mb-1">Last Name</label>
                            </div>
                            <FormController
                                controlType="input"
                                control={control}
                                name="lastName"
                                placeholder=""
                            />
                            <div>
                                <label className="block semi-bold mb-1">Email Address</label>
                            </div>
                            <FormController
                                controlType="input"
                                control={control}
                                name="email"
                                placeholder=""
                                readOnly={true}
                                disabled={true}
                            />
                            <div>
                                <label className="block semi-bold mb-1">Phone</label>
                            </div>
                            <FormController
                                controlType="input"
                                control={control}
                                name="phone"
                                placeholder=""
                            />

                        </div>
                        <div>
                            <div className="grid grid-cols-1 gap-x-4 px-2" >
                                <div>
                                    <label className="block semi-bold mb-1">Bio</label>
                                </div>
                                <FormController
                                    controlType="textarea"
                                    control={control}
                                    name="bio"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block font-bold mb-1">Profile Avatar</label>
                            <div className="flex items-center space-x-4">
                                {data.profileAvatarUrl ? (
                                    <img
                                        src={data.profileAvatarUrl}
                                        alt={data.firstName}
                                        className="w-28 h-28 rounded"
                                    />
                                ) : (
                                    <div className="w-28 h-28 flex items-center justify-center bg-gray-200 rounded">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    </div>
                                )}
                                <FileUpload
                                    handleImage={handleImage}
                                    fileError={fileError}
                                    handleUpload={handleUpload}
                                    isFileExists={isFile}
                                    fileName={fileName}
                                />

                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                variant="contained-primary"
                                type="submit"
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </LoadingCustomOverlay>
        </div>
    );
};

export default EditProfile;
