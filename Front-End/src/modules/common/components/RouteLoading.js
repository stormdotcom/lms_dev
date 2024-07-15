import React from "react";
import { GridLoader as CustomLoader } from "react-spinners";
import { PROJECT_PROPS } from "../../../common/constants";
const RouteLoading = (props) => {
    return (
        <div className="flex items-center justify-center h-full" style={{ height: "90vh" }}>
            <div>
                <CustomLoader {...props} color={"#4a4a4a"} />
            </div>
            <div>
                <p className="text-secondary text-3xl font-extrabold"> {PROJECT_PROPS.BRAND.NAME} </p>
            </div>
            <div className="mt-2">
                <p className="text-secondary text-sm"> Downloading assets... </p>
            </div>
        </div>
    );
};

export default RouteLoading;
