'use strict';

if(process.env.NODE_ENV === 'production') {
  module.exports = {
    DATABASE: {
      "username": process.env.DATABASE_USER,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_DATABASE,
      "host": process.env.DATABASE_HOST,
      "port": process.env.DATABASE_PORT,
      "dialect": process.env.DATABASE_DIALECT,
      "storage": process.env.DATABASE_STORAGE,
      "define": {
        "paranoid": true
      },
      "logging": false
    },
    MONGO_DB: process.env.MONGO_DB
  };
} else {
  module.exports = require('./development.json');
}
