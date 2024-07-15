/* eslint-disable valid-jsdoc */

import { USER_TYPE } from "../modules/user-management/auth/constants";
import _ from "lodash";

export const getBase64 = file => {
    // eslint-disable-next-line no-undef
    return new Promise(resolve => {
        let baseURL = "";
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };
    });
};

export const sortByKeys = data => {
    let sorted = Object.keys(data).sort()
        .reduce(function (acc, key) {
            acc[key] = data[key];
            return acc;
        }, {});

    Object.keys(sorted).forEach(key => {
        if (!sorted[key] || sorted[key].length === 0) {
            delete sorted[key];
        }
    });

    return sorted;
};


export const downloadFileAsync = async ({ response, file: { name = "download", ext = "pdf" } = {} }) => {
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.${ext}`);
    document.body.appendChild(link);
    link.click();
};

/**
*  Convert Numbers to INR abbreviation
 * @param  {String} value Amount
 * @param  {Number} points Decimal points length
 * @returns {Boolean}
 */
export const inrFormatter = (value, points) => {
    const newVal = parseInt(value);
    if (newVal < 100000) {
        return `₹${newVal.toFixed(points)}`;
    } else {
        const converted = newVal.toLocaleString("en-IN", {
            style: "currency", currency: "INR", notation: "compact", minimumFractionDigits: points,
            roundingIncrement: 5
        });
        return converted;
    }
};


export const ImageBase64 = async (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    // eslint-disable-next-line no-undef
    const data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    return data;
};


export const routePermission = (user = {}, routes = []) => {
    let newRoutes = _.cloneDeep(routes[0]);
    let newChildren = [];
    const { userType = USER_TYPE.VESSEL } = user;
    routes[0].children.map((child = []) => {
        // eslint-disable-next-line no-console
        let currentPath = _.get(child, "path", "");
        if (userType === USER_TYPE.ADMIN && _.get(child, "path", "") === "admin") {
            newChildren.push(child);

        }
        if (userType === USER_TYPE.CREATOR && _.get(child, "path") === "instructor") {
            newChildren.push(child);
        }
        if (userType === USER_TYPE.USER && !currentPath.includes("instructor") && !currentPath.includes("admin")) {
            newChildren.push(child);
        }
    });
    _.set(newRoutes, "children", newChildren);
    return [newRoutes, routes[1], routes[2]];
};
export const videoFiles = [
    "video/mp4",
    "video/x-m4v",
    "video/avi",
    "video/mpeg",
    "video/x-ms-wmv",
    "video/x-msvideo",
    "video/webm"
];

export const docMimeTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/pdf",
    "image/jpeg",
    "image/jpg"
];
export const imageFiles = ["image/x-png", "image/png", "image/jpg", "image/jpeg"];
export const imageMaxSize = 10000000; // bytes
export const videoMaxSize = 2362231613; // bytes

export const verifyFile = (files, fileSize = imageMaxSize, acceptedFileTypesArray = imageFiles) => {
    if (files && files.length > 0) {
        const currentFile = files[0];
        const currentFileType = currentFile.type;
        const currentFileSize = currentFile.size;
        const sizeInMb = Math.round((currentFileSize / 1000000) * 100) / 100;
        const fileSizeInMb = Math.round((fileSize / 1000000) * 100) / 100;
        if (currentFileSize > fileSize) {
            return { isVerified: false, message: `${sizeInMb}mb not allowed, should be less than ${fileSizeInMb}MB` };
        }
        if (!acceptedFileTypesArray.includes(currentFileType)) {
            return { isVerified: false, message: `${currentFileType} type file of Allowed` };
        }
        return { isVerified: true, status: "File Accepted", currFileName: currentFile.name || "Sample File" };
    }
};

export const removeStringPortion = (str, maxLength = 20) => {
    if (str.length > maxLength) {
        return str.substr(0, maxLength) + "...";
    }
    return str;
};
