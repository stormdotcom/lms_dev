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
    name,
    statusCode,
    description,
    isOperational,

    loggingErrorResponse
  ) {
    super(description + message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.message = message;
    this.logError = loggingErrorResponse;
    Error.captureStackTrace(this);
    if (loggingErrorResponse) {
      console.error(loggingErrorResponse);
    }
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(
    message,
    name,
    statusCode,
    description = "Internal Server Error",
    isOperational = true,

  ) {
    super(message, name, statusCode, description, isOperational);
  }
}

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