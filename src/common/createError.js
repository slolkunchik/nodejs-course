module.exports = (errorType, message) => {
  const err = new Error(message || 'no text');
  err.status = errorType;
  throw err;
};
