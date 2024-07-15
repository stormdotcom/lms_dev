import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { API_URL } from "../../apiUrls";
import { loaderNotify, successNotify } from "../../../../../utils/notificationUtils";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../../common/axiosInstance";
import { sentCompleteVideo } from "../../actions";
import { verifyFile, videoFiles, videoMaxSize } from "../../../../../utils/commonUtils";
import { dismissNotification } from "reapop";

const VideoUploadComponent = ({ id, slug, videoNo }) => {
    const dispatch = useDispatch();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [err, setErr] = useState();
    const [fileError, setFileError] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // New state for selected file
    const [titleInput, setTitleInput] = useState(""); // State for title input
    const [titleError, setTitleError] = useState(""); // State for title error

    const uploadFile = async () => {
        if (!selectedFile) {
            setErr("No file selected for upload.");
            return;
        }
        if (!titleInput) {
            setTitleError("Title is required.");
            return;
        }

        setTitleError(""); // Clear any previous title error

        const file = selectedFile; // Use the selected file from state
        try {
            dispatch(loaderNotify({ title: "Lecture " + videoNo, message: `${fileName} uploading`, id: `${fileName}` }));
            const startResponse = await axiosInstance.post(`${API_URL.COURSE.VIDEO}`, {
                fileName: file.name,
                fileType: file.type,
                slug
            });
            const { UploadId, Key } = startResponse.data;
            const partSize = 5 * 1024 * 1024; // 5MB
            const parts = [];
            let totalProgress = 0;

            for (let start = 0, partNumber = 1; start < file.size; start += partSize, partNumber++) {
                const end = Math.min(start + partSize, file.size);
                const blob = file.slice(start, end);

                const presignedResponse = await axiosInstance.post(`${API_URL.COURSE.GET_URL}`, {
                    Key,
                    UploadId,
                    PartNumber: partNumber
                });

                const { uploadUrl } = presignedResponse.data;

                const uploadResponse = await axios.put(uploadUrl, blob, {
                    headers: { "Content-Type": file.type }
                });

                const ETag = uploadResponse.headers.etag;
                parts.push({ ETag, PartNumber: partNumber });

                totalProgress += (end - start) / file.size;
                setUploadProgress(Math.round(totalProgress * 100));
            }

            dispatch(successNotify({ message: "File uploaded successfully!" }));
            dispatch(sentCompleteVideo({
                Key,
                UploadId,
                Parts: parts,
                courseId: id, slug, videoNo, title: titleInput
            }));
            setTimeout(() => {
                dispatch(dismissNotification(`${fileName}`));
            }, 0);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Upload failed:", error);
            setErr("Failed to upload the video. Please try again later.");
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        setErr("");
        setFileError("");
        const file = acceptedFiles[0];

        let files = acceptedFiles;
        if (files.length > 1) {
            setFileError("Please upload only one file at a time.");
        }
        if (files && files.length > 0) {
            const { isVerified, message = "" } = verifyFile(files, videoMaxSize, videoFiles);
            if (isVerified) {
                setFileName(file.name);
                setSelectedFile(file); // Store the selected file in state
            } else {
                setFileError(message);
            }
        }

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="space-y-4">
            <div {...getRootProps()} className="border-dashed h-[25vh] border-2 p-4 cursor-pointer hover:bg-gray-100">
                <input {...getInputProps()} />
                <div className="flex flex-col items-center space-y-2">
                    <div className="text-center">
                        {isDragActive ? (
                            <p className="text-secondary">Drop the video file here</p>
                        ) : (
                            !fileName && <p>Drag 'n' drop a video file here, or click to select one</p>
                        )}
                        {fileName && <div className="chip bg-secondary text-white px-4 py-2 rounded-full cursor-pointer hover:bg-secondaryLight">
                            {fileName}
                        </div>}
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="w-[10%] relative">
                            {fileName && <CircularProgressbar
                                value={uploadProgress}
                                text={`${uploadProgress}%`}
                                strokeWidth={8}
                                styles={{
                                    path: { stroke: "#d170f7" },
                                    text: { fill: "#5C5C5D", fontSize: "20px" }
                                }}
                            />}
                        </div>
                    </div>
                    {err && <p className="text-red-400">{err}</p>}
                    {fileError && <p className="text-red-400">{fileError}</p>}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="Enter Lecture title"
                    className="border p-2 rounded"
                />
                {titleError && <p className="text-red-400">{titleError}</p>}
                {fileName && <button onClick={uploadFile} className="bg-primary text-white px-4 py-2 rounded">Upload</button>}
            </div>
        </div>
    );
};

export default VideoUploadComponent;
