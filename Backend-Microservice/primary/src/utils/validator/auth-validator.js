const { validator } = require(".");
const { loginSchema, signUpSchema } = require("./schema/auth");
const { updateProfileSchema } = require("./schema/user");


const signValidation = (
    req,
    res,
    next
) => {
    validator(loginSchema, req.body, next);
};

const signUpValidation = (
    req,
    res,
    next
) => {
    validator(signUpSchema, req.body, next);
};


module.exports = {
    signValidation,
    signUpValidation
}