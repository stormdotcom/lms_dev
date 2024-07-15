const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  CONFLICT: 409
};

class AppError extends Error {
  constructor(
    message,
    name = 'Error',
    statusCode = 500,
    description = 'Internal Server Error',
    isOperational = true,
    loggingErrorResponse
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.logError = loggingErrorResponse;
    Error.captureStackTrace(this);
    if (loggingErrorResponse) {
      console.error(loggingErrorResponse);
    }
  }
}

// API Specific Errors
class APIError extends AppError {
  constructor(
    message,
    name = 'Internal Server Error',
    statusCode = 500,
    description = 'An unexpected error occurred',
    isOperational = true,
  ) {
    super(message, name, statusCode, description, isOperational);
  }
}

module.exports = { AppError, APIError };


//400
class BadRequestError extends AppError {
  constructor(description = "Bad request", loggingErrorResponse) {
    super(
      "NOT FOUND",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      loggingErrorResponse
    );
  }
}

//400
class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack) {
    super(
      "BAD REQUEST",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};