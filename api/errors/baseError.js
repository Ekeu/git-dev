class BaseError extends Error {
  constructor(name, httpCode, description, isOperational) {
    // Calling parent class
    super(description);

    /**
     * this ==> BaseError
     * new.target.prototype ==> Error
     */
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
