import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import ProjectLayouts from "./layouts/ProjectLayouts";
import { useDispatch, useSelector } from "react-redux";
import { actions as commonActions } from "./modules/common/slice";
import { STATE_REDUCER_KEY } from "./modules/common/constants";
import { SocketProvider } from "./@app/SocketProvider";
import { BROWSER_STORAGE } from "./common/constants";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const homePath = useSelector(state => state[STATE_REDUCER_KEY].homePath);
  const jwtToken = localStorage.getItem(BROWSER_STORAGE.ACCESS_TOKEN);
  useEffect(() => {
    dispatch(commonActions.setNavigator(navigate));
    if (pathname === "/") {
      navigate(`./${homePath}`);
    }
  }, []);
  return (
    <SocketProvider jwtToken={jwtToken}>
      <div className="app">
        <ProjectLayouts>
          <Outlet />
        </ProjectLayouts>
      </div>
    </SocketProvider>
  );
}

export default App;
