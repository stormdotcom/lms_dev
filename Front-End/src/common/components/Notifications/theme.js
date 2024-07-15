import { createTheme } from "reapop";

const customTheme = createTheme({
    notification: (notification) => ({
        className: "max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden mb-4",
        style: {
            backgroundColor: "#ffffff",
            borderLeft: `4px solid ${notification.status === "success" ? "#4CAF50" : notification.status === "error" ? "#F44336" : "#2196F3"}`
        },
        innerClassName: "flex-1 w-0 p-4",
        icon: {
            className: `h-6 w-6 text-${notification.status === "success" ? "green-400" : notification.status === "error" ? "red-400" : "blue-400"}`
        },
        message: {
            className: "ml-3 font-medium text-gray-900"
        },
        dismissButton: {
            className: "ml-4 flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            style: {
                backgroundColor: "#e2e8f0"
            }
        }
    })
});

export default customTheme;
