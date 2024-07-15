import React, { lazy } from "react";

const DashBoardHome = lazy(() => import("./dashboard/components/Wrapper"));
const ProfileWrapper = lazy(() => import("./profile/components/ProfileWrapper"));
const CourseWrapper = lazy(() => import("./course/components/Wrapper"));
const ViewCourse = lazy(() => import("./course/components/ViewCourse/View"));
const CreateCourse = lazy(() => import("./course/components/Create/CreateCourse"));
const LectureCreate = lazy(() => import("./course/components/Create/LectureCreate"));
const EditCourse = lazy(() => import("./course/components/Create/EditCourse"));
const WatchLecture = lazy(() => import("./course/components/Watch"));

const routes = [
    {
        path: "dashboard",
        element: <DashBoardHome />
    },
    {
        path: "profile",
        element: <ProfileWrapper />
    },
    {
        path: "analytics/performance",
        element: <ProfileWrapper />
    },
    {
        path: "courses",
        element: <CourseWrapper />
    },
    {
        path: "courses/:slug/view",
        element: <ViewCourse />
    },
    {
        path: "course/:slug/lecture/:id",
        element: <WatchLecture />
    },
    {
        path: "courses/edit/:slug/",
        element: <LectureCreate />
    },
    {
        path: "courses/create",
        element: <CreateCourse />
    },
    {
        path: "courses/edit/:slug/publish",
        element: <EditCourse />
    },
    {
        path: "student-management",
        element: <p>Student Management</p>
    },
    {
        path: "finance-management",
        element: <p>Finance Management</p>
    },
    {
        path: "support-feedback",
        element: <p>Support</p>
    }
];

export { routes };//View
