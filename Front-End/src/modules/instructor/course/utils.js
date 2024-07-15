import axiosInstance from "../../../common/axiosInstance";
import { API_URL } from "./apiUrls";


export const findCourseBySlug = (courses, slug) => {
    return courses.find(course => course.slug === slug);
};


export const fetchVideoChunk = async (videoKey = "", range) => {
    const endPoint = `${API_URL.COURSE.STREAM}/:${videoKey}`;
    try {
        const response = await axiosInstance.get(endPoint, {
            headers: {
                Range: range
            },
            responseType: "blob" // Ensure the response type is set to 'blob' for binary data
        });

        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching video chunk", error);
        throw error;
    }
};
const formatSingleOption = (option) => ({ label: option, value: option });
const formatMultipleOptions = (options) => options.map(option => ({ label: option, value: option }));

export const transformCourseData = (data, thumbnailUrl = "") => {
    return {
        title: data.title,
        description: data.description,
        category: data.category,
        level: data.level.value,
        thumbnailUrl: thumbnailUrl,
        language: data.language.value,
        tags: data.tags.map(tag => tag.value),
        options: data.options

    };
};


export function formatToCourseDetails(data) {
    return {
        id: data.id || 0,
        slug: data.slug || 0,
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        level: formatSingleOption(data.level) || "",
        thumbnailUrl: data.thumbnailUrl || "",
        language: formatSingleOption(data.language) || "",
        tags: formatMultipleOptions(data?.tags || []) || [""],
        options: {
            requirements: (data.options && data.options.requirements) ? data.options.requirements : ["..."]
        }
    };
}
