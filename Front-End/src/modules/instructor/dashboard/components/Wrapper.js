import React from "react";
import { Dashboard } from "./Dashboard/Dashboard";
import InsightsWrapper from "./Insights.js/InsightsWrapper";

const Wrapper = () => {

    return (
        <div>
            <Dashboard />
            <InsightsWrapper />
        </div>
    );
};

export default Wrapper;
