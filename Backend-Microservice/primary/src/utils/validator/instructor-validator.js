const { createCourseSchema, uploadAttachments } = require("./schema/course");
const { validator, queryValidator } = require("./index")

const createCourseValidator = (
    req,
    res,
    next
) => {
    validator(createCourseSchema, req.body, next);
};

const uploadAttachmentsValidate = (
    req,
    res,
    next
) => {
    queryValidator(uploadAttachments, req.params, next);
};


module.exports = {
    createCourseValidator,
    uploadAttachmentsValidate

}

//queryValidator