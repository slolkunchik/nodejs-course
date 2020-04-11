const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

module.exports = (err, req, res) => {
  if (!err.status) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  res.status(err.status).send(getStatusText(err.status));
};
