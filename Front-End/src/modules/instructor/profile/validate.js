import * as yup from "yup";

export const ProfileValidation = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    bio: yup.string().max(500, "Bio must be at most 500 characters")
});
