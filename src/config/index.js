const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  app: {
    environment: process.env.ENVIRONMENT || 'development',
    name: process.env.APP_NAME || 'node-express-boilerplate',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 4000
  }
}
