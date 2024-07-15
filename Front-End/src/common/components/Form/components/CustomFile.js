import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { UploadIcon } from "@heroicons/react/outline";

const FileUpload = ({ name, label, accept, type, ...rest }) => {
    const { setError, clearErrors } = useFormContext();
    const {
        field: { onChange, onBlur, ref },
        fieldState: { error }
    } = useController({
        name,
        defaultValue: ""
    });

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            if (
                (accept.includes("video/") && fileType.startsWith("video/")) ||
                (accept.includes("image/") && fileType.startsWith("image/")) ||
                (accept.includes("application/") && fileType.startsWith("application/"))
            ) {
                clearErrors(name);
                onChange(e);
            } else {
                setError(name, {
                    type: "manual",
                    message: "Invalid file type. Please upload a valid file."
                });
                e.target.value = null;
            }
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div className="flex items-center">
                <label className="cursor-pointer flex items-center space-x-2">
                    <UploadIcon className="h-6 w-6 text-gray-500" />
                    <input
                        id={name}
                        name={name}
                        type="file"
                        accept={accept}
                        onChange={handleChange}
                        onBlur={onBlur}
                        ref={ref}
                        className="hidden"
                        {...rest}
                    />
                    <span className="text-gray-700">Upload {type}</span>
                </label>
            </div>
            {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
        </div>
    );
};

export default FileUpload;
