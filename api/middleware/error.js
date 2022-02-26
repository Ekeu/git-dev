const BaseError = require('../errors/baseError');
const logger = require('../log/logger');

function logErrors(err) {
  logger.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  console.log(err);
  logErrors(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.httpCode || 500).send(err.message);
}

function isOperationalError(err) {
  if (err instanceof BaseError) {
    return err.isOperational;
  }

  return false;
}

module.exports = {
  logErrors,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
