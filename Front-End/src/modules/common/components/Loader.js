import React from "react";
import { GridLoader as CustomLoader } from "react-spinners";
import { PROJECT_PROPS } from "../../../common/constants";

const Loader = (props) => {
  return (
    <div className="flex items-center justify-center h-full" style={{ height: "90vh" }}>
      <div className="text-center">
        <CustomLoader {...props} color={"#4a4a4a"} />
        <div className="mt-4">
          <p className="text-secondary text-3xl font-extrabold">{PROJECT_PROPS.BRAND.NAME}</p>
        </div>
        <div className="mt-2">
          <p className="text-secondary text-sm">Preparing your experience, please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
