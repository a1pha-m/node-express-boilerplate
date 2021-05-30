const uuid = require('uuid').v4;

module.exports = async (req, res, next) => {
  const request_id = uuid();

  req.request_id = request_id;
  res.setHeader('X-Request-Id', request_id);

  next();
};
