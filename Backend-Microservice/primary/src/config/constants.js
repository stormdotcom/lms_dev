const STORAGE_KEYS = {
    ACCESS_TOKEN: "lms_token",
    REFRESH_TOKEN: "refresh_token"
};
const adminDetails = { firstName: "admin", lastName: "lms", email: "admin@lms", password: "ajmal@test", isVerified: true, status: 1, role: 1 }
const creatorDetails = { firstName: "Steve", lastName: "Jobs", email: "steve@lms.com", password: "12345678", isVerified: true, status: 1, role: 2 }
const userDetails = { firstName: "Ajmal", lastName: "Nasumudeen", email: "ajmaln73@gmail.com", password: "12345678", isVerified: false, status: 1, role: 3 }
const EXCHANGE_NAME = "main_exchange:lms"
const ROUTING_KEY = {
    NOTIFICATION: "notification",
    ANALYTICS: "analytics",
    PROGRESS: "progress",
    LOGIN: "login",
    COURSE_VISIT: "course_visit",
    SESSION: "session",

    RECENT_ACTIVITIES: "recent_activities"
}
const EVENT_TYPES = {
    LOGGED_IN_SESSION: "loggedIn_session",
    COURSE_VISITED: "course_visited",
    PROGRESS_UPDATE: "progress_update",
    SESSION_DURATION: "session_duration",
    LOGGED_OUT: "logged_out"
};
const USER_TYPES = { ADMIN: "admin", CREATOR: "instructor", USER: "user" };

module.exports = {
    USER_TYPES,
    adminDetails,
    creatorDetails,
    userDetails,
    STORAGE_KEYS,
    EXCHANGE_NAME,
    ROUTING_KEY,
    EVENT_TYPES
}

