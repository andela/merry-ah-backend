import dotenv from 'dotenv';
dotenv.config();
 const { DB_USER, DB_NAME, DB_PASSWORD, DB_NAME_TEST} = process.env;
const config =  {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

export default config;
