import React, { lazy } from "react";
import { RootBoundary } from "../../common/components";
import { PublicRoute } from "../../common/components/ProtectedRoute/PublicRoute";

const SignIn = lazy(() => import("./auth/components/Login"));
const SignUp = lazy(() => import("./auth/components/SignUp"));

const routes = [
    {
        path: "login",
        element: <PublicRoute><SignIn /> </PublicRoute>,
        errorElement: <RootBoundary />
    },
    {
        path: "register",
        element: <PublicRoute> <SignUp /> </PublicRoute>,
        errorElement: <RootBoundary />
    }

];

export { routes };
