module.exports = (req, res, next, errorType, message) => {
  const err = new Error(message || 'no text');
  err.status = errorType;
  return next(err);
};
