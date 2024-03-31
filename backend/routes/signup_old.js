const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const router = express.Router();
const HttpCodes = require("../enums/http-codes");
require("dotenv/config");
const pool = require("../mysql_db");



// Sign Up
router.post("/signup", (req, res) => {
  const { name, email, contact, weight, height, password } = req.body;
  if (name == "" || email == "" || password == "") {
    res
      .status(HttpCodes.BadRequest)
      .send({ errmessage: "Please fill out all the fields." });
    return;
  }


  const insertsql =
    "INSERT INTO users(user_name,email,contact_no,weight,height,password) VALUES ?;";
  const values = [[req.body.name, req.body.email, req.body.contact, req.body.weight, req.body.height, md5(req.body.password)]];
  let connection;
  let data;

  pool
    .then((p) => p.getConnection())
    .then((p) => {
      connection = p;
      connection.beginTransaction();
      data = connection.query(insertsql, [values]);
      return data;
    })
    .then((results) => {
      if (results.affectedRows === 0) {
        throw new Error("new user is not added.");
      }
      const payload = { user_id: results["insertId"]};
      console.log("PAYLOAD+++", payload);
      const token = jwt.sign(payload, process.env.Secret, {
        expiresIn: 60 * 60,
      });
      res.status(HttpCodes.OK).send({ jwt: `JWT ${token}` });
      connection.commit();
      connection.release();
    })
    .catch((err) => {
      res.status(HttpCodes.NotFound).send({ errmessage: err.message });
      connection.rollback();
      connection.release();
    });
});

// Load Balancer Health Check Route
router.get("/", (req, res) => {
  // console.log('Hitting server');
  res.status(HttpCodes.OK).send("Done");
});

module.exports = router;
