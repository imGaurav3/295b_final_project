const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const router = express.Router();
const HttpCodes = require('../enums/http-codes');
require('dotenv/config');
const pool = require('../mysql_db');

// Sign Up
router.post('/signup', (req, res) => {
  // Assuming 'dob' is now part of the request body
  const { name, email, password, dob } = req.body;

  // Removed 'contact', 'weight', and 'height' as they are not part of the new schema
  if (name === '' || email === '' || password === '' || dob === '') {
    res
      .status(HttpCodes.BadRequest)
      .send({ errmessage: 'Please fill out all the fields.' });
    return;
  }

  // Updated to match 'user_data' table and its columns
  const insertSql = `
    INSERT INTO user_data(name, email, password, dob)
    VALUES (?, ?, ?, ?);
  `;
  // Note: Ensure 'dob' is in a valid datetime format 'YYYY-MM-DD HH:MM:SS' or 'YYYY-MM-DD'
  const values = [name, email, md5(password), dob];

  pool
    .then((p) => p.getConnection())
    .then((connection) => {
      // Begin transaction
      connection.beginTransaction();

      // Execute the insert query with the provided values
      return connection
        .query(insertSql, values)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error('New user has not been added.');
          }

          // Use the inserted user's ID for the JWT payload
          const payload = { user_id: results.insertId };
          const token = jwt.sign(payload, process.env.Secret, {
            expiresIn: '1h',
          });

          // Commit transaction and release connection
          connection.commit();
          connection.release();

          // Respond with the JWT token
          res.status(HttpCodes.OK).send({ jwt: `JWT ${token}` });
        })
        .catch((err) => {
          // On error, rollback transaction and release connection
          connection.rollback(() => connection.release());

          // Send error response
          res
            .status(HttpCodes.InternalServerError)
            .send({ errmessage: err.message });
        });
    })
    .catch((err) => {
      res
        .status(HttpCodes.InternalServerError)
        .send({ errmessage: 'Database connection failed.' });
    });
});

// Load Balancer Health Check Route
router.get('/', (req, res) => {
  // console.log('Hitting server');
  res.status(HttpCodes.OK).send('Done');
});

// Fetch User Data by Email
router.get('/fetch-user', async (req, res) => {
  const { email } = req.query; // Assume email is passed as a query parameter

  if (!email) {
    return res
      .status(HttpCodes.BadRequest)
      .send({ errmessage: 'Email is required.' });
  }

  try {
    const connection = await pool.getConnection();

    try {
      const query =
        'SELECT id, name, email, dob FROM user_data WHERE email = ?';
      const [rows] = await connection.query(query, [email]);

      if (rows.length === 0) {
        return res
          .status(HttpCodes.NotFound)
          .send({ errmessage: 'User not found.' });
      }

      res.status(HttpCodes.OK).send(rows[0]); // Send the first matching user
    } finally {
      connection.release(); // Ensure connection is always released
    }
  } catch (err) {
    console.error(err);
    res
      .status(HttpCodes.InternalServerError)
      .send({ errmessage: 'Error fetching user data.' });
  }
});

module.exports = router;
