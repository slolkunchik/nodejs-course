module.exports = (req, res, next, errorType) => {
  const err = new Error();
  err.status = errorType;
  return next(err);
};
