import * as yup from "yup";

export const loginValidation = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    savePassword: yup.boolean()
});


export const SignUpValidation = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required")
});
