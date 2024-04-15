const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const router = express.Router();
const HttpCodes = require('../enums/http-codes');
require('dotenv/config');
const pool = require('../mysql_db');

// Sign In
router.post('/submit_signin_ques', async (req, res) => {
  // Extract values from the request body
  const { user_id, mood, recommOption, chipGroup, chipTime } = req.body;

  // Check if any of the required fields are empty
  if (!user_id || !mood || !recommOption || !chipGroup || !chipTime) {
    return res
      .status(HttpCodes.BadRequest)
      .json({ errmessage: 'Please fill out all the fields.' });
  }

  try {
    // Prepare the SQL query
    const insertSql = `
      INSERT INTO questionnaire_responses(user_id, mood, interest, with_whom, time_preference)
      VALUES (?, ?, ?, ?, ?);
    `;
    const values = [user_id, mood, recommOption, chipGroup, chipTime];

    // Use pool.then().then() structure for handling database operations
    pool
      .then((p) => {
        // Get a connection from the pool
        return p.getConnection().then((connection) => {
          // Begin transaction
          connection.beginTransaction();

          // Execute the query with the provided values
          return connection
            .query(insertSql, values)
            .then((results) => {
              if (results.affectedRows === 0) {
                throw new Error(
                  'New questionnaire response has not been added.'
                );
              }

              // Commit transaction and release connection
              connection.commit();
              connection.release();

              // Respond with success message
              res.status(HttpCodes.OK).json({
                message: 'Questionnaire responses stored successfully.',
              });
            })
            .catch((err) => {
              // On error, rollback transaction and release connection
              connection.rollback(() => connection.release());

              // Send error response
              res
                .status(HttpCodes.InternalServerError)
                .json({ errmessage: err.message });
            });
        });
      })
      .catch((err) => {
        // Send error response if failed to get connection from pool
        res
          .status(HttpCodes.InternalServerError)
          .json({ errmessage: 'Failed to get database connection.' });
      });
  } catch (err) {
    console.error(err);
    res
      .status(HttpCodes.InternalServerError)
      .json({ errmessage: 'Error storing questionnaire responses.' });
  }
});

// POST API to handle signup questionnaire submission
// Signup
router.post('/submit_signup_ques', async (req, res) => {
  const { user_id, fav_movie, happy_movie, sad_movie, neutral_movie } =
    req.body;

  // Check for required fields
  if (!user_id || !fav_movie || !happy_movie || !sad_movie || !neutral_movie) {
    return res
      .status(HttpCodes.BadRequest)
      .json({ errmessage: 'Please provide all required fields' });
  }
  try {
    // Prepare the SQL query
    const insertSql = `
      INSERT INTO movie_preferences (user_id, fav_movie, happy_movie, sad_movie, neutral_movie)
      VALUES (?, ?, ?, ?, ?);
  `;
    const values = [user_id, fav_movie, happy_movie, sad_movie, neutral_movie];

    // Use pool.then().then() structure for handling database operations
    pool
      .then((p) => {
        // Get a connection from the pool
        return p.getConnection().then((connection) => {
          // Begin transaction
          connection.beginTransaction();

          // Execute the query with the provided values
          return connection
            .query(insertSql, values)
            .then((results) => {
              if (results.affectedRows === 0) {
                throw new Error(
                  'New questionnaire response has not been added.'
                );
              }

              // Commit transaction and release connection
              connection.commit();
              connection.release();

              // Respond with success message
              res.status(HttpCodes.OK).json({
                message: 'Questionnaire responses stored successfully.',
              });
            })
            .catch((err) => {
              // On error, rollback transaction and release connection
              connection.rollback(() => connection.release());

              // Send error response
              res
                .status(HttpCodes.InternalServerError)
                .json({ errmessage: err.message });
            });
        });
      })
      .catch((err) => {
        // Send error response if failed to get connection from pool
        res
          .status(HttpCodes.InternalServerError)
          .json({ errmessage: 'Failed to get database connection.' });
      });
  } catch (err) {
    console.error(err);
    res
      .status(HttpCodes.InternalServerError)
      .json({ errmessage: 'Error storing questionnaire responses.' });
  }
});

module.exports = router;
