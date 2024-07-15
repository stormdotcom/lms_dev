const { validator } = require(".");
const { updateProfileSchema } = require("./schema/user");


const validateProfileDetails = (
    req,
    res,
    next
) => {
    validator(updateProfileSchema, req.body, next);
};


module.exports = {
    validateProfileDetails
}