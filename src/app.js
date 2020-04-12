const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./middleware/errorHandler');
const createErrorMiddleware = require('./middleware/createErrorMiddleware');
const {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  getStatusText
} = require('http-status-codes');
const logger = require('./middleware/loggerMiddleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  logger.info(
    `request method: ${req.method}; request URL: ${
      req.originalUrl
    }; query: ${JSON.stringify(req.query)}; body: ${JSON.stringify(req.body)}`
  );
  next();
});

app.use('/users', userRouter);
app.use('/boards', [boardRouter, taskRouter]);
app.use('*', (req, res, next) =>
  createErrorMiddleware(req, res, next, NOT_FOUND, 'the route was not found')
);

app.use((err, req, res, next) => {
  logger.error(
    `Error status code ${err.status ||
      INTERNAL_SERVER_ERROR} was captured! status text: ${getStatusText(
      err.status || INTERNAL_SERVER_ERROR
    )}, message: ${err.message}`
  );
  errorHandler(err, req, res, next);
});

// TODO: For testing uncaughtException uncomment this code:

// setTimeout(() => {
//   throw new Error('Oops! UncaughtException!');
// }, 1500);

process.on('uncaughtException', err => {
  logger.error(
    `captured error: ${err.message}, point in code: ${err.stack
      .split('\n')[1]
      .slice(26) || ''}`
  );

  // handling, app will be stoped
  const exit = process.exit;
  exit(1);
});

// TODO: For testing unhandledRejection uncomment this code:

// setTimeout(() => {
//   Promise.reject(new Error('Oops! UnhandledRejection'));
// }, 1500);

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled Rejection, reason: ${reason}`);

  // handling, app will be stoped
  const exit = process.exit;
  exit(1);
});

module.exports = app;
