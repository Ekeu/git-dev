const BaseError = require('./baseError');
const HttpStatusCodes = require('./httpStatusCodes');

class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCodes.INTERNAL_SERVER,
    isOperational = true,
    description = 'Internal server error'
  ) {
    super(name, httpCode, description, isOperational);
  }
}

module.exports = APIError;
