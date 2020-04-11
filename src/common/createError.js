module.exports = errorType => {
  const err = new Error();
  err.status = errorType;
  throw err;
};
