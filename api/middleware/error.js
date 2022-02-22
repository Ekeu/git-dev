const BaseError = require('../errors/baseError');
const logger = require('../log/logger');

function logErrors(err) {
  logger.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logErrors(err);
  next(err);
}

function returnError(err, req, res, nexr) {
  res.status(err.statusCode || 500).send(err.message);
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
