
const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const router = express.Router();
const HttpCodes = require("../enums/http-codes");
require("dotenv/config");
const pool = require("../mysql_db");

router.get("/getlocations", async(req, res) => {
    // const { userId } = req.params;
    // console.log("it is here in dashborad backend", userId);
    console.log("it is here in landing page backend");
  try
  {
    const selectlocationssql = "SELECT gym_location FROM dbhealthclub.gym_info;";
    let connection;
    let locationdata;
    let result;

  pool
    .then((p) => p.getConnection())
    .then((p) => {
      connection = p;
      connection.beginTransaction();
      locationdata = connection.query(selectlocationssql);
      return locationdata;
    })
    .then((results) => {
      console.log(results);
      res.status(HttpCodes.OK).send(results);
      connection.commit();
      connection.release();
    })
   }
   catch(err){
      res.status(HttpCodes.NotFound).send(err);
      connection.rollback();
      connection.release();
    }
  });
  
  // Get Memberships and Classes details

  router.get("/:location", async(req, res) => {
    const { location } = req.params;
    const selectClassSql =
    "SELECT DISTINCT * FROM dbhealthclub.classes c WHERE c.location = ?;"
     const selectMemSql =
     "SELECT * FROM dbhealthclub.membership_details;";
    let connection;
    let classesData;
    let membershipsData;
    console.log("Here in mem and class gathering backend code :"+location);
    pool
      .then((p) => p.getConnection())
      .then((p) => {
        connection = p;
        connection.beginTransaction();
        // classesData = connection.query(selectClassSql, [location]);
        //  membershipsData = connection.query(selectMemSql);
        // return {classes : classesData,memberships : membershipsData};
        return Promise.all([
            connection.query(selectClassSql, [location]),
            connection.query(selectMemSql)
          ]);
      })
      .then((results) => {
        classesData = results[0];
        membershipsData = results[1];
        const classesArray = Object.values(classesData);
        const membershipsArray = Object.values(membershipsData);
        console.log("classesData: " + JSON.stringify(classesData) + " ; " + "memData: " + JSON.stringify(membershipsData));

        // console.log("classesData :"+classesArray+" ; "+"memData: "+membershipsArray);
        const combinedData = { classes: classesArray, memberships: membershipsArray };
        res.status(HttpCodes.OK).send(combinedData);
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