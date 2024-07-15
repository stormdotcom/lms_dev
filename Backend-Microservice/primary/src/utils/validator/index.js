
const createHttpError = require("http-errors");


const validator = async (schemaName, body, next) => {
    try {
        await schemaName.validateAsync(body, { abortEarly: false });
        next();
    } catch (error) {
        next(createHttpError(422, error));// eslint-disable-line no-console
    }
};

const queryValidator = async (schemaName, params, next) => {
    try {
        await schemaName.validateAsync(params, { abortEarly: false });
        next();
    } catch (error) {
        next(createHttpError(422, error));
    }
};

module.exports = {
    validator,
    queryValidator
};
