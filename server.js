const express = require('express');
const http = require('http');
const next = require('next');
const dotenv = require('dotenv');
const colors = require('colors');

const dbConnect = require('./utils/db/db-connect');
const httpLogger = require('./api/log/httpLogger');
const logger = require('./api/log/logger');
const { logErrorMiddleware, returnError } = require('./api/middleware/error');
const APIError = require('./api/errors/apiError');
const HttpStatusCodes = require('./api/errors/httpStatusCodes');

const { isOperationalError, logErrors } = require('./api/middleware/error');

const userRoutes = require('./api/routes/user');

dotenv.config();

dbConnect();

const app = express();
const server = http.createServer(app);

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

process.on('unhandledRejection', (error) => {
  throw error;
});

process.on('uncaughtException', (error) => {
  logErrors(error);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

app.use(express.json());

nextApp.prepare().then(() => {
  app.use('/api/v1/users', userRoutes);
  app.all('*', (req, res) => handle(req, res));

  app.use(httpLogger);
  app.use(logErrorMiddleware);
  app.use(returnError);

  server.listen(port, (error) => {
    if (error)
      throw new APIError(
        'SERVER ERROR',
        HttpStatusCodes.INTERNAL_SERVER,
        true,
        error.message
      );
    logger.info(`Custom server ready on http://${hostname}:${port}`);
  });
});
