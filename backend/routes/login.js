const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const router = express.Router();
const HttpCodes = require("../enums/http-codes");
require("dotenv/config");
const pool = require("../mysql_db");

// User Login
router.post("/", (req, res) => {
  console.log("inside login");
  const { email, password } = req.body;
  if (email == "" || password == "") {
    res
      .status(HttpCodes.BadRequest)
      .send({ errmessage: "Please enter all the credential details" });
    return;
  }

  const sql = "SELECT * from users where email=? and password=?";
  let connection;
  let data;
  pool
    .then((conn) => {
      connection = conn.getConnection();
      return connection;
    })
    .then((conn) => {
      data = conn.query(sql, [req.body.email, md5(req.body.password)]);
      return data;
    })
    .then((results) => {
      const payload = { user_id: results[0].user_id };
      console.log("PAYLOAD+++", payload);
      const token = jwt.sign(payload, process.env.Secret, {
        expiresIn: 60 * 60,
      });
      res.status(HttpCodes.OK).send({ jwt: `JWT ${token}` });
    })
    .catch((err) => {
      res.send("error", err);
      connection.release();
    });
});

// Admin Login
router.post("/adminlogin", (req, res) => {
  console.log("inside adminlogin");
  const { email, password } = req.body;
  if (email == "" || password == "") {
    res
      .status(HttpCodes.BadRequest)
      .send({ errmessage: "Please enter all the credential details" });
    return;
  }

  const adminloginsql = "SELECT * from admin where email=? and password=?";
  let connection;
  let data;
  pool
    .then((conn) => {
      connection = conn.getConnection();
      return connection;
    })
    .then((conn) => {
      data = conn.query(adminloginsql, [req.body.email, req.body.password]);
      return data;
    })
    .then((results) => {
      const payload = { admin_id: results[0].admin_id };
      console.log("PAYLOAD+++", payload);
      const token = jwt.sign(payload, process.env.Secret, {
        expiresIn: 60 * 60,
      });
      res.status(HttpCodes.OK).send({ jwt: `JWT ${token}` });
    })
    .catch((err) => {
      res.send("error", err);
      connection.release();
    });
});

module.exports = router;
