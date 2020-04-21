const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const logger = require('../common/logger');

module.exports = (err, req, res, next) => {
  logger.error(
    `Error status code ${err.status ||
      INTERNAL_SERVER_ERROR} was captured! status text: ${getStatusText(
      err.status || INTERNAL_SERVER_ERROR
    )}, message: ${err.message}`
  );

  if (!err.status) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  res.status(err.status).send(getStatusText(err.status));

  next();
};
