const { BAD_REQUEST } = require('http-status-codes');

module.exports = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    if (error instanceof TypeError) {
      const err = new Error();
      err.status = BAD_REQUEST;
      return next(err);
    }
    return next(error);
  }
};
