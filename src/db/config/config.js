const dotenv = require('dotenv');

dotenv.config();
const {
  DB_USER, DB_NAME, DB_PASSWORD, DB_NAME_TEST, DATABASE_URL, PROD_DIALECT
} = process.env;
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    url: DATABASE_URL,
    dialect: PROD_DIALECT
  }
};
