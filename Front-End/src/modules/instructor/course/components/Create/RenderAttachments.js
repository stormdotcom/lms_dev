import { PaperClipIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { removeStringPortion } from "../../../../../utils/commonUtils";

const RenderAttachment = ({ attachment, source = "local" }) => {
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        if (source === "local" && (attachment instanceof File || attachment instanceof Blob)) {
            const url = URL.createObjectURL(attachment);
            setFileUrl(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [attachment, source]);

    const handleDivClick = (url) => {
        window.open(url, "_blank");
    };

    if (source === "remote") {
        const fileExtension = attachment.split(".").pop().toLowerCase();
        switch (fileExtension) {
            case "pdf":
                return (
                    <div
                        onClick={() => handleDivClick(attachment)}
                        style={{ width: "100px", overflow: "hidden", position: "relative", marginLeft: "5px", marginRight: "5px", cursor: "pointer" }}
                        className="border border-secondary rounded my-1 mx-[2px] px-1 text-center hover:bg-blue-100 cursor-pointer"
                    >
                        <iframe
                            src={attachment}
                            type="application/pdf"
                            style={{ margin: "auto", width: "100px", height: "80px" }}
                            sandbox="allow-same-origin"
                        ></iframe>
                    </div>
                );
            case "doc":
            case "docx":
                return (
                    <div
                        onClick={() => handleDivClick(attachment)}
                        style={{ width: "100px", height: "80px", overflow: "hidden", position: "relative", marginLeft: "5px", marginRight: "5px", cursor: "pointer" }}
                        className="border border-secondary rounded my-1 mx-[2px] px-1 hover:bg-blue-100 cursor-pointer"
                    >
                        <iframe
                            style={{
                                width: "300%",
                                height: "300%",
                                transform: "scale(0.33)",
                                transformOrigin: "0 0",
                                border: "none",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                overflow: "hidden"
                            }}
                            src={`https://view.officeapps.live.com/op/embed.aspx?src=${attachment}`}
                            title="DOC Attachment"
                        />
                        <a href={attachment} target="_blank" rel="noopener noreferrer" className="text-xs mt-1 text-primary hover:underline">
                            View Document
                        </a>
                    </div>
                );
            default:
                return (
                    <div
                        onClick={() => handleDivClick(attachment)}
                        className="border border-secondary p-1 rounded my-1 mx-[2px] px-1 hover:bg-blue-100 cursor-pointer"
                        style={{ marginLeft: "5px", marginRight: "5px", cursor: "pointer" }}
                    >
                        <img src={attachment} alt="attachments" className="text-primary hover:underline" style={{ margin: "auto", width: "100px", height: "70px" }} />
                    </div>
                );
        }
    } else if (source === "local") {
        if (!(attachment instanceof File || attachment instanceof Blob)) {
            // eslint-disable-next-line no-console
            console.error("Invalid file object:", attachment);
            return <div className="text-red-500">Invalid file object</div>;
        }
        const fileExtension = attachment.name.split(".").pop().toLowerCase();

        return (
            <div
                style={{ width: "100px", height: "110px", overflow: "hidden", marginLeft: "5px", marginRight: "5px" }}
                className="attachment-box border border-secondary p-2 rounded"
            >
                {fileExtension === "pdf" && (
                    <iframe
                        src={fileUrl}
                        style={{ margin: "auto", width: "100px", height: "70px" }}
                        title="PDF Viewer"
                    />
                )}
                {(fileExtension === "doc" || fileExtension === "docx") && (
                    <div
                        style={{ marginLeft: "5px", marginRight: "5px", width: "100px", height: "66px", overflow: "hidden", position: "relative" }}
                        className="border border-secondary rounded my-2 mx-[2px]"
                    >
                        <iframe
                            style={{
                                width: "300%",
                                height: "300%",
                                transform: "scale(0.33)",
                                transformOrigin: "0 0",
                                border: "none",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                overflow: "hidden"
                            }}
                            src={`https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`}
                            title="DOC Attachment"
                        />
                    </div>
                )}
                {(fileExtension === "jpg" || fileExtension === "jpeg") && (
                    <div className="border border-secondary p-1 rounded my-2 mx-[2px] cursor-pointer" style={{ marginLeft: "5px", marginRight: "5px" }}>
                        <img src={fileUrl} alt="attachments" style={{ margin: "auto", width: "100px" }} className="text-primary hover:underline" />
                    </div>
                )}
                <div className="mt-1">
                    <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                        <PaperClipIcon className="h-3 w-3" />
                        <span className="ml-1 text-xs font-semibold">
                            {removeStringPortion(attachment?.name, 10)}
                        </span>
                    </label>
                </div>
            </div>
        );
    }
};

export default RenderAttachment;
