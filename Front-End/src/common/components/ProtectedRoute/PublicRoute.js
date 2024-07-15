import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { BROWSER_STORAGE } from "../../constants";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "../../../modules/common/constants";

export const PublicRoute = ({ children }) => {
    let hasToken = localStorage.getItem(BROWSER_STORAGE.ACCESS_TOKEN);
    const location = useLocation();
    const safePath = useSelector(state => state[STATE_REDUCER_KEY].safePath) || "home/dashboard";
    return hasToken ? (
        <Navigate
            replace={true}
            to={`../${safePath}`}
            state={{ from: location.pathname + location.search }}
        />
    ) : (
        <>{children}</>
    );
};
