import React from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { removeStringPortion } from "../../../../../utils/commonUtils";
import { FaVideoSlash } from "react-icons/fa";


const ThumbnailUpload = ({ handleImage, fileError = "", handleUpload, isFileExists = false, fileName = "" }) => {
    return (
        <div className="flex flex-col items-center mt-1">
            <div className="w-full rounded border border-dotted border-gray-400 p-1">
                <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                    <FaVideoSlash className="h-5 w-5" />
                    <span className="ml-1 text-xs font-semibold">
                        {isFileExists ? removeStringPortion(fileName, 25) : "No File Chosen"}
                    </span>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    name="fileUpload"
                    onChange={(e) => {
                        handleImage(e); e.target.value = "";
                    }}
                    className="hidden"
                />
            </div>
            {fileError && <span className="text-red-500 text-sm mt-1">{fileError}</span>}

            {isFileExists && (
                <div className="mt-2">
                    <button
                        onClick={handleUpload}
                        className="flex items-center border border-primary hover:bg-primary hover:text-white text-primary px-2 py-1 rounded"
                    >
                        <ArrowUpCircleIcon className="h-5 w-5" />
                        <span className="ml-1 text-xs">Upload Course Thumbnail</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThumbnailUpload;
