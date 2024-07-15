import * as yup from "yup";


export const createCourseValidation = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    tags: yup.array().of(
        yup.object().shape({
            id: yup.number().optional("Tag ID is required"),
            value: yup.string().required("Tag value is required")
        })
    ).required("Tags are required"), // Multi-value
    language: yup.object().shape({
        id: yup.number().optional(),
        value: yup.string().required("Language is required")
    }),
    level: yup.object().shape({
        id: yup.number().optional(),
        value: yup.string().required("Difficulty Level is required")
    }),
    // thumbnailUrl: yup.string().url("Must be a valid URL").required("Thumbnail URL is required"),
    requirements: yup.array().of(
        yup.string().required("Requirement is required") // Each requirement is a string
    ).required("Requirements are required")
});


export const createLecture = yup.object().shape({
    lectures: yup.array().of(
        yup.object().shape({
            title: yup.string().required("Title is required")
        })
    )
});
