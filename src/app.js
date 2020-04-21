const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./middleware/errorHandler');
const createErrorMiddleware = require('./middleware/createErrorMiddleware');
const { NOT_FOUND } = require('http-status-codes');
const app = express();
const logger = require('./common/logger');
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

app.use(errorHandler);

module.exports = app;
