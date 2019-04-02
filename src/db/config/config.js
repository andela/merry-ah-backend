const dotenv = require('dotenv');

dotenv.config();
const {
  DB_USER, DB_NAME, DB_PASSWORD, DB_NAME_TEST, DB_HOST,
} = process.env;
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: DB_HOST,
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: DB_HOST,
    dialect: 'postgres'
  }
};
