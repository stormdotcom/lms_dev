import axios from "axios";
import { BROWSER_STORAGE } from "./constants";

const token = localStorage.getItem(BROWSER_STORAGE.ACCESS_TOKEN);

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_UPLOAD_SERVER,
    timeout: 65000,
    headers: {
        Authorization: `Bearer ${token}` // Include the bearer token in headers
    }
});

export default axiosInstance;
