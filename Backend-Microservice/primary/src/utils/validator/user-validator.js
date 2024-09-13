const { validator } = require(".");
const { updateProfileSchema, searchSchema } = require("./schema/user");


const validateProfileDetails = (
    req,
    res,
    next
) => {
    validator(updateProfileSchema, req.body, next);
};


const searchValidator = (
    req,
    res,
    next
) => {
    validator(searchSchema, req.query, next);
};

module.exports = {
    validateProfileDetails,
    searchValidator
}