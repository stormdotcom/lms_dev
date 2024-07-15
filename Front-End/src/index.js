import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persister, store } from "./@app/store";
import { ReactNotifications } from "./common/components";

import ProjectRoutes from "./ProjectRoutes";
import { Loader } from "./modules/common/components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persister}>
        <ReactNotifications />
        <ProjectRoutes />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
