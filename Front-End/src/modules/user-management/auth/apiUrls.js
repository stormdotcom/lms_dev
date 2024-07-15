const API_URL = {
    AUTH: {
        SIGN_IN: "auth/v1/sign-in",
        SIGN_UP: "auth/v1/sign-up",
        REFRESH_TOKEN: "auth/v1/refresh-token",
        RESET_PASSWORD: "auth/v1/reset-password"
    },
    USER_MANAGEMENT: {
        GET_CURRENT_PROFILE: "user/profile",
        ORG_ADMINS: "no-auth/org-admins"
    }
};

export default API_URL;
