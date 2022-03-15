const winston = require('winston');
const Sentry = require('winston-transport-sentry-node').default;

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console(options.console),
    //new Sentry(options.sentry),
  ],
  exitOnError: false,
});

module.exports = logger;
