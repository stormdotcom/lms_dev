
const BadRequestErrorHandler = (error, req, res, next) => {
    if (error.status === 422) {
        console.log("errorHandler 422", error);
        return res.status(422).json(error);
    }
    if (error.status === 401) {
        console.log("errorHandler 422", error);
        return res.status(401).json(error);
    }
    next(error)
};

module.exports = BadRequestErrorHandler;