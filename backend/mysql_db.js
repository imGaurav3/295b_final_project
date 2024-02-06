// mysql database connection
const mysql = require('mysql');
// const e = require('express');

const dbConfig = require('./routes/config');

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

const mysqll = require('promise-mysql');
const pool = mysqll.createPool(dbConfig);

module.exports = pool;