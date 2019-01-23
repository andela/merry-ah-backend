const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  options: {
    swaggerDefinition: {
      info: {
        title: 'Art Cave',
        version: '1.0.0',
        description: 'Art Cave api documentation'
      },
      host: process.env.APP_BASE_URL,
      basePath: '/'
    },
    apis: [
      path.resolve(path.resolve(__dirname), '../routes/**/*.js'),
      path.resolve(path.resolve(__dirname), '../index.js')
    ]
  }
};
