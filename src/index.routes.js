const express = require('express');

const {errorUtils} = require('./utils');

const routes = express.Router();

routes.use('*', (req, res, next) => {
  try {
    return errorUtils.throwNotFound('Route');
  } catch (e) {
    return next(e);
  }
});

module.exports = routes;
