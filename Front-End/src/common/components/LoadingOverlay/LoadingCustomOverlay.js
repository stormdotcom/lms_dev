import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { ScaleLoader, PulseLoader, ClipLoader } from "react-spinners";

import { GridLoader, DotLoader } from "react-spinners";
import NotificationLoader from "../../../modules/common/components/NotificationBanner/Loader";

const DefaultLoader = () => (
    <div className="flex justify-center items-center min-h-[10vh] w-[10vh] bg-primary-dark p-1 rounded-md">
        <div className="text-center">
            <GridLoader color="#be32f5" size={8} speedMultiplier={2} />
            <p className="text-secondary-light text-xs font-extrabold mt-2">Loading Data...</p>
        </div>
    </div>
);

const PredictionLoader = () => (
    <div className="flex justify-center items-center min-h-[10vh] bg-primary-dark p-1 rounded-md">
        <div className="flex flex-col justify-evenly items-center space-y-2">
            <DotLoader color="#be32f5" size={25} speedMultiplier={1.4} />
            <p className="text-center text-secondary-light text-xs font-extrabold">Processing Data...</p>
        </div>
    </div>
);

const VerticalLoader = () => (
    <div className="flex justify-center items-center min-h-[30px] w-[180px] bg-[rgba(0,0,0,0.37)] p-1 rounded-md">
        <div className="flex flex-col justify-evenly items-center px-3 py-1">
            <PulseLoader color="#be32f5" size={10} speedMultiplier={1.1} />
        </div>
    </div>
);
const MediaUploaderLoader = () => (
    <div className="flex justify-center items-center min-h-[80px] w-[80px] bg-[rgba(0,0,0,0.22)] p-1 rounded-md">
        <div className="flex justify-center flex-col items-center px-3 py-1">
            <ClipLoader color="#000000" size={35} />
        </div>
    </div>
);

const VideoLoader = () => (
    <div className="flex justify-center items-center min-h-[80px] w-[80px]] p-1 rounded-md">
        <div className="flex justify-center flex-col items-center px-3 py-1">
            <ClipLoader color="#fff" size={35} />
        </div>
    </div>
);

const LoadingCustomOverlay = ({ active, children, spinnerProps = "" }) => {
    let loader = <ScaleLoader color={"#4a4a4a"} />;

    switch (spinnerProps) {
        case "selectTagProp":
            loader = <VerticalLoader color={"#4a4a4a"} />;
            break;
        case "form":
            loader = <PredictionLoader color={"#4a4a4a"} />;
            break;
        case "notify":
            loader = <NotificationLoader />;
            break;
        case "upload":
            loader = <MediaUploaderLoader />;
            break;
        case "video":
            loader = <VideoLoader />;
            break;
        default:
            loader = <DefaultLoader />;
            break;
    }
    return (
        <LoadingOverlay
            active={active}
            styles={{
                overlay: (base) => ({
                    ...base,
                    background: "transparent",
                    zIndex: 999
                })
            }}
            spinner={loader}
        >
            {children}
        </LoadingOverlay>
    );
};

export default LoadingCustomOverlay;
