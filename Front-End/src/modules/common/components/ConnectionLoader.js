import React from "react";
import { GridLoader as CustomLoader } from "react-spinners";
import { PROJECT_PROPS } from "../../../common/constants";

const ConnectionLoader = (props) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mb-4">
                <CustomLoader {...props} color={"#4a4a4a"} />
            </div>
            <div>
                <p className="text-secondary text-3xl font-extrabold">{PROJECT_PROPS.BRAND.NAME}</p>
            </div>
            <div className="mt-2">
                <p className="text-gray-500 mt-2">Please wait while we connect...</p>
            </div>
        </div>
    );
};

export default ConnectionLoader;
