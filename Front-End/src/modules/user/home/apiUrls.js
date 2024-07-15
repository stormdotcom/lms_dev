const API_URL = {
    HOME: {
        DASHBOARD: "service/user/dashboard",
        RECENT_ACTIVITIES: "service/user/activities",
        NOTIFICATION: "service/user/notification"
    },
    COURSE: {
        RECOMMENDED: "service/user/recommended-course-list",
        ALL: "service/user/learning/course-all",
        COURSE: "service/user/learning/course/:id",
        OTHER: "no-auth/org-admins"
    },
    MENU: {
        USER: "user/profile",
        CHANGE_PASSWORD: "no-auth/org-admins"
    }
};

export { API_URL };
