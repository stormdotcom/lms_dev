import React from "react";
import { useLocation } from "react-router-dom";
import Navigate from "./Navigate";
// import { BROWSER_STORAGE } from "../../constants";

export const PrivateRoute = ({ children }) => {
  let hasToken = true; // localStorage.getItem(BROWSER_STORAGE.ACCESS_TOKEN);

  const location = useLocation();
  return hasToken ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
};
