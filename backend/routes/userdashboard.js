
const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const router = express.Router();
const HttpCodes = require("../enums/http-codes");
require("dotenv/config");
const pool = require("../mysql_db");



  /*
-------------------------------------------------------------------------------------------
User Dashboard Routes for 202
-------------------------------------------------------------------------------------------
*/

//GET USER MEMBERSHIP

//Display membership name, cost, start data, end date 
router.get("/mymem/:id", (req, res) => {
    const { id } = req.params;
    const selectmemsql =
      "SELECT * FROM mem_enrolled m where m.user_id = ?;";
    const sqlgetmemname = 
        "SELECT name FROM membership_details WHERE mem_id = ?;";
    let connection;
    let data;
    let finalRes;
    pool
      .then((p) => p.getConnection())
      .then((p) => {
        connection = p;
        connection.beginTransaction();
        data = connection.query(selectmemsql, [id]);
        return data;
      })
      .then((results) => {
        console.log("testing......");
        //console.log(results[0]);
        finalRes = results[0];
        //results[0].temp = "test";
        //const temp = Object.values(results);
        //const temp = JSON.parse(JSON.stringify(results))
        //console.log("MEM ID: ",temp[0].mem_id);
        //console.log(finalRes.mem_id);
        data1 = connection.query(sqlgetmemname, [results[0].mem_id]);
        return data1;
      })
      .then((results) => {
        console.log(results);
        finalRes.mem_name = results[0].name;
        console.log(finalRes);
        res.status(HttpCodes.OK).send({ mem: finalRes });
        connection.commit();
        connection.release();
      })
      .catch((err) => {
        res.status(HttpCodes.NotFound).send({ errmessage: err.message });
        connection.rollback();
        connection.release();
      });
  });



// GET ALL CLASSESS
router.get("/classes", (req, res) => {
    const selectsql =
      "SELECT * FROM classes;";
    let connection;
    let data;
  
    pool
      .then((p) => p.getConnection())
      .then((p) => {
        connection = p;
        connection.beginTransaction();
        data = connection.query(selectsql);
        return data;
      })
      .then((results) => {
        console.log(results);
        res.status(HttpCodes.OK).send({ classes: results });
        connection.commit();
        connection.release();
      })
      .catch((err) => {
        res.status(HttpCodes.NotFound).send({ errmessage: err.message });
        connection.rollback();
        connection.release();
      });
  });


  //GET CLASSES ENROLLED BY A USER
  router.get("/myclasses/:id", (req, res) => {
    const { id } = req.params;
    const getenrolledclass = 
        "select enroll_date, class_name, duration, location, ce.class_id from classes_enrolled ce inner join  classes c on (ce.user_id = ? and ce.class_id = c.class_id)";
    // const getclasssql =
    //   "SELECT * FROM classes_enrolled m where m.user_id = ?;";
    // const getclassname = 
    //     "SELECT * FROM classes WHERE class_id = ?;";
    let connection;
    let data;
    pool
      .then((p) => p.getConnection())
      .then((p) => {
        connection = p;
        data = connection.query(getenrolledclass, [id]);
        return data;
      })
      .then((results) => {
        console.log("classes......");
        console.log(results);
        res.status(HttpCodes.OK).send({ enclass: results });
        connection.release();
      })
      .catch((err) => {
        res.status(HttpCodes.NotFound).send({ errmessage: err.message });
        connection.release();
      });
  });



  //ENROLL INTO A CLASS
  router.post("/enroll/class", (req, res) => {
    const { classId, userId, enrollDate } = req.body;
    console.log(classId);
    console.log(userId);
    
    const sqlStartDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(sqlStartDate);
    const enrollclasssql =
      "INSERT INTO classes_enrolled(class_id , user_id, enroll_date) VALUES ?;";
    const values = [[classId, userId, enrollDate]];
    let connection;
    let data;
    
    pool
      .then((p) => p.getConnection())
      .then((p) => {
        connection = p;
        connection.beginTransaction();
        data = connection.query(enrollclasssql, [values]);
        return data;
      })
      .then((results) => {
        if (results.affectedRows === 0) {
          throw new Error("Class could not be enrolled!");
        }
        res.status(HttpCodes.OK).send({ message: `Class ${classId} enrolled!` });
        connection.commit();
        connection.release();
      })
      .catch((err) => {
        res.status(HttpCodes.NotFound).send({ errmessage: err.message });
        connection.rollback();
        connection.release();
      });
  });



  //VIEW LOGGED ACTIVITIES FILTERED BY DATE RANGE
  router.post("/myactivities", (req, res) => {
    const { userId, fromDate, toDate } = req.body;
    const getloggedactivities = "SELECT * FROM activities where user_id = ? AND (CAST(logged_date AS DATE) BETWEEN ? AND ? );";
    //const getloggedactivities = "SELECT * FROM activities where user_id = " + userId +" AND (logged_date BETWEEN " + fromDate + " AND " + toDate +" );";
    let connection;
    let data;
    pool
      .then((p) => p.getConnection())
      .then((p) => {
        connection = p;
        data = connection.query(getloggedactivities, [userId, fromDate, toDate]);
        return data;
      })
      .then((results) => {
        console.log("classes......");
        console.log(results);
        res.status(HttpCodes.OK).send({ enclass: results });
        connection.release();
      })
      .catch((err) => {
        res.status(HttpCodes.NotFound).send({ errmessage: err.message });
        connection.release();
      });
  });




  //LOG ACITVITY FOR A USER
  router.post("/log", (req, res) => {
    const { userId, activityName, mins, location } = req.body;
    
    
    const sqlStartDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(sqlStartDate);
    const enrollclasssql =
      "INSERT INTO activities(user_id, activity_name, logged_mins, logged_date, location) VALUES ?;";
    const values = [[userId, activityName, mins, sqlStartDate, location]];
    let connection;
    let data;
    
    pool
      .then((p) => p.getConnection())
      .then((p) => {
        connection = p;
        connection.beginTransaction();
        data = connection.query(enrollclasssql, [values]);
        return data;
      })
      .then((results) => {
        if (results.affectedRows === 0) {
          throw new Error("Not able to log activity!");
        }
        res.status(HttpCodes.OK).send({ message: `Activity ${activityName} logged!` });
        connection.commit();
        connection.release();
      })
      .catch((err) => {
        res.status(HttpCodes.NotFound).send({ errmessage: err.message });
        connection.rollback();
        connection.release();
      });
  });

  
  module.exports = router;