import React, { lazy } from "react";

const UserHome = lazy(() => import("./home/components/HomeWrapper"));
const CoursePreview = lazy(() => import("./learnings/components/CoursePreview/CoursePreview"));
const StartVideo = lazy(() => import("./learnings/components/Lecture/StartVideo"));
const ProfileWrapper = lazy(() => import("./profile/components/ProfileWrapper"));
const SettingsWrapper = lazy(() => import("./profile/Settings/SettingsWrapper"));
const EditProfile = lazy(() => import("./profile/Details/EditProfile"));
const Settings = lazy(() => import("./profile/Settings/Settings"));
const ChangePassword = lazy(() => import("./profile/Settings/ChangePassword"));

const routes = [
    {
        path: "dashboard",
        element: <UserHome />
    },
    {
        path: "course/:slug",
        element: <CoursePreview />
    },
    {
        path: "course/:slug/learn/lecture/:videoId",
        element: <StartVideo />
    },
    {
        path: "profile/details",
        element: <ProfileWrapper><EditProfile /></ProfileWrapper>
    },
    {
        path: "profile/settings",
        element: <ProfileWrapper>
            <SettingsWrapper>
                <Settings />
            </SettingsWrapper>

        </ProfileWrapper>
    },
    {
        path: "profile/change-password",
        element: <ProfileWrapper>
            <SettingsWrapper>
                <ChangePassword />
            </SettingsWrapper>
        </ProfileWrapper>
    }

];

export { routes };
