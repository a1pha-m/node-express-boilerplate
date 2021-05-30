const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const config = require('./config');
const {requestIdMiddleware} = require('./middlewares');
const routes = require('./index.routes');
const {errorHandler} = require('./handlers');

let app;
let server;

const init = async () => {
  const {host, port, name} = config.app;
  app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(compression());

  app.use(requestIdMiddleware);

  app.use(routes);

  app.use(errorHandler);

  server = app.listen(port, host, (err) => {
    if (err) {
      console.error({err, message: err.message});
    }
    console.info({message: `Server running on http://${host}:${port}`});
  });
};

const shutdown = async () => {
  if (!server) {
    return;
  }
  server.close((err) => {
    if (err) {
      process.exitCode = 1;
    }
    process.exit();
  });
};

process.on('SIGINT', async () => {
  console.info({message: 'Got SIGINT. Graceful shutdown '});
  await shutdown();
});

process.on('SIGTERM', async () => {
  console.info({message: 'Got SIGTERM. Graceful shutdown '});
  await shutdown();
});

init().then(result => console.log({result})).catch(error => console.log({error}));
