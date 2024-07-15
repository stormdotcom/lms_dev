import React, { Suspense } from "react";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./modules/routes";
import RouteLoading from "./modules/common/components/RouteLoading";

const ProjectRoutes = () => {
  //   const user = useSelector((state) => state[STATE_REDUCER_KEY].user);
  return (
    <Suspense fallback={<RouteLoading />}>
      <RouterProvider router={createHashRouter(routes)} />
      <Outlet />
    </Suspense>
  );
};

export default ProjectRoutes;
