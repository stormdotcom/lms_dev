const { createLogger, transports, format } = require('winston');
const { AppError } = require('./app-errors');

// Configure Winston logger
const LogErrors = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log' })
    ]
});

// Error Logger class
class ErrorLogger {
    async logError(err) {
        LogErrors.error({
            message: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString()
        });
    }

    isTrustError(error) {
        return error instanceof AppError && error.isOperational;
    }
}


const ErrorHandlerFinal = async (err, req, res, next) => {
    const errorLogger = new ErrorLogger();

    // Log the error
    await errorLogger.logError(err);


    if (errorLogger.isTrustError(err)) {

        return res.status(500).json({ message: err.message, ...err });
    }

    // Handle unexpected errors
    return res.status(500).json({ message: err.message, ...err });
};

module.exports = ErrorHandlerFinal;
