const { PORT } = require('./common/config');
const app = require('./app');
const connectToDB = require('./db/db.client');
const logger = require('./common/logger');

// TODO: For testing uncaughtException uncomment this code:
//
// setTimeout(() => {
//   throw new Error('Oops! UncaughtException!');
// }, 1500);

process.on('uncaughtException', err => {
  logger.error(
    `captured error: ${err.message}, point in code: ${err.stack
      .split('\n')[1]
      .slice(26) || ''}`
  );

  process.exitCode = 1;
  throw new Error('uncaughtException error occurred');
});

// TODO: For testing unhandledRejection uncomment this code:

// setTimeout(() => {
//   Promise.reject(new Error('Oops! UnhandledRejection'));
// }, 1500);

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled Rejection, reason: ${reason}`);

  process.exitCode = 1;
  throw new Error('Unhandled Rejection error occurred');
});

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
