module.exports = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    // log all errors
    console.error(error);
    return next(error);
  }
};
