const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const router = express.Router();
const HttpCodes = require("../enums/http-codes");
require("dotenv/config");
const pool = require("../mysql_db");


/*
-------------------------------------------------------------------------------------------
Admin Routes for 202
-------------------------------------------------------------------------------------------
*/

// No longer neeeded, but leaving here for now
router.post("/enroll/userid", async (req, res) => {
  // Get user ID from user table by looking up the name from user input
  const sqlGetUserID = "SELECT user_id from users WHERE user_name ='" + req.body.userName + "'";
  let connection;
  pool
  .then((conn) => {
    connection = conn;
    return conn.query(sqlGetUserID); // Resolve the Promise returned by query()
  })
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    console.error(err);
  });
});

// No longer neeeded, but leaving here for now
router.post("/enroll/memberid", async (req, res) => {

  // Get member ID for this user from membership_details table
  const sqlGetMemberID = "SELECT mem_id from membership_details WHERE name ='" + req.body.membershipName + "'";
  pool
  .then((conn) => {
    connection = conn;
    return conn.query(sqlGetMemberID); // Resolve the Promise returned by query()
  })
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    console.error(err);
  });
});

router.post("/enroll/memenroll", async (req, res) => {

  // ONly input needed are membershipr name, user id, is member

  // Write user ID, member ID, start date, end date, is member to mem_enrolled table

  const sqlStartDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const startDate = new Date();

  const sqlGetMemEndDate = "SELECT duration, mem_id from membership_details WHERE name ='" + req.body.membershipName + "'";
  const sqlInsertMemEnrolled = "INSERT INTO mem_enrolled (user_id, mem_id, start_date, end_date, is_member) VALUES ?;";
  let valuesInsertMemEnrolled  = [[req.body.userID, -1, sqlStartDate, sqlStartDate, req.body.isMember]];

  pool
    .then((p) => p.getConnection())
    .then((p) => {
      connection = p;
      connection.beginTransaction();
      return connection.query(sqlGetMemEndDate);
    })
    .then((res) => {
      // connection = p;
      console.log('data received', res[0]);
      console.log('-----', res[0].duration);
      const endDate = new Date(startDate.setMonth(startDate.getMonth()+res[0].duration));
      const sqlEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ');
      console.log('end date', sqlEndDate);
      valuesInsertMemEnrolled[0][3] = sqlEndDate;
      valuesInsertMemEnrolled[0][1] = res[0].mem_id;
      return connection.query(sqlInsertMemEnrolled, [valuesInsertMemEnrolled]);
    })
    .then((results) => {
      if (results.affectedRows === 0) {
        throw new Error("New membership could not be added to mem_enrolled!");
      }
      res.status(HttpCodes.OK).send({ message: `Membership for ${req.body.userID} created!` });
      connection.commit();
      connection.release();
    })
    .then((results) => {
      if (results.affectedRows === 0) {
        throw new Error("New membership could not be added to mem_enrolled!");
      }
      res.status(HttpCodes.OK).send({ message: `Membership for ${req.body.name} created!` });
      connection.commit();
      connection.release();
    })
    .catch((err) => {
      res.status(HttpCodes.NotFound).send({ errmessage: err.message });
      connection.rollback();
      connection.release();
    });
    console.log('------4');
});

router.post("/checkin", async (req, res) => {

  // Write to check_in, user_name, user_id, email field to table when user checks in
  const sqlInsertCheckin = "INSERT INTO check_in_check_out (check_in, user_id, location) VALUES ?;";
  const valuesInsertCheckin  = [[req.body.checkIn, req.body.userID, req.body.location]];

  pool
    .then((p) => p.getConnection())
    .then((p) => {
      connection = p;
      connection.beginTransaction();
      data = connection.query(sqlInsertCheckin, [valuesInsertCheckin]);
      return data;
    })
    .then((results) => {
      if (results.affectedRows === 0) {
        throw new Error(`User ${req.body.userID} could not be added to check_in_check_out!`);
      }
      res.status(HttpCodes.OK).send({ message: `User ${req.body.userID} checked in!` });
      connection.commit();
      connection.release();
    })
    .catch((err) => {
      res.status(HttpCodes.NotFound).send({ errmessage: err.message });
      connection.rollback();
      connection.release();
    });
});

router.post("/eligibility", async (req, res) => {
  // Get the user's enrollment end date from memenrolled
  const sqlCheckUserEligibility = "SELECT end_date from mem_enrolled WHERE user_id ='" + req.body.userID + "'";
  let connection;
  pool
  .then((conn) => {
    connection = conn;
    return conn.query(sqlCheckUserEligibility);
  })
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    console.error(err);
  });
});

router.post("/checkout", async (req, res) => {

  const currCheckinDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  // Update row for user check out by pulling existing row used for check in by user name and email
  console.log(currCheckinDate);
  const sqlInsertCheckin = "UPDATE check_in_check_out SET"
    + " check_out = '" + req.body.checkOut + "'"
    + " WHERE"
    + " user_id = '" + req.body.userID + "'"
    + " AND"
    + " CAST(check_in AS DATE) = CAST( '" + currCheckinDate + "' AS DATE)";

  pool
    .then((p) => p.getConnection())
    .then((p) => {
      connection = p;
      connection.beginTransaction();
      data = connection.query(sqlInsertCheckin);
      return data;
    })
    .then((results) => {
      if (results.affectedRows === 0) {
        throw new Error(`User ${req.body.userID} could not be checked out!`);
      }
      res.status(HttpCodes.OK).send({ message: `User ${req.body.userID} checked out!` });
      connection.commit();
      connection.release();
    })
    .catch((err) => {
      res.status(HttpCodes.NotFound).send({ errmessage: err.message });
      connection.rollback();
      connection.release();
    });
});

router.post("/dashboard/getclasses", async (req, res) => {
  /*
    Returns object where keys are class names and values are enroll count

    Sample Output:

    {
      "Yoga": 2,
      "Zumba": 0,
      "Aeorobic": 0
    }

  */
  

  // req should have location, startDate, and endDate

  // First get class IDs that match current location
  const sqlGetClassIDsByLocation = "SELECT class_id, class_name from classes"
  + " WHERE"
  + " location ='" + req.body.location + "'";

  let connection;
  pool
  .then((conn) => {
    connection = conn;
    return conn.query(sqlGetClassIDsByLocation);
  })
  .then( async (results) => {
    console.log('Class IDs returned: ', results);

    let countMap = {};
    // For each class ID, get the count based on start date and end date
    for (let i = 0; i < results.length; i++) {
      const classID = results[i].class_id;
      const className = results[i].class_name;

      let sqlGetClasses = "SELECT COUNT(" + classID + ") AS `count` FROM classes_enrolled"
      + " WHERE enroll_date >='" + req.body.startDate + "'"
      + " AND" + " enroll_date <= '" + req.body.endDate + "'"
      + " AND" + " class_id = '" + classID + "'";

      if (req.body.startDate.slice(0, 10) == req.body.endDate.slice(0, 10)) {
        const startOfDay = ' 00:00:00';
        const endOfDay = ' 23:59:59';
        const newStartDate = req.body.startDate.replace(req.body.startDate.slice(10), startOfDay);
        const newEndDate = req.body.endDate.replace(req.body.endDate.slice(10), endOfDay);


        sqlGetClasses = "SELECT COUNT(" + classID + ") AS `count` FROM classes_enrolled"
        + " WHERE enroll_date >='" + newStartDate + "'"
        + " AND" + " enroll_date <= '" + newEndDate + "'"; 
      }

      const count = await connection.query(sqlGetClasses).then((result) => {
        console.log('count found', result[0].count);

        return result[0].count;
      });

      countMap[className] = count;

    }

    res.send(countMap);
  })
  .catch((err) => {
    console.error(err);
  });
});

router.post("/dashboard/getenrollment", async (req, res) => {
  /*
    Sample output

    {
      "GOLD": 2,
      "SILVER": 1
    }

  */

  // req should have startDate, and endDate
  // no location needed because user membership works for multiple locations

  const sqlGetEnrollment= "SELECT COUNT(id) AS `count`, membership_details.name FROM mem_enrolled"
    + " INNER JOIN membership_details ON mem_enrolled.mem_id = membership_details.mem_id"
    + " WHERE start_date >='" + req.body.startDate + "'"
    + " AND" + " start_date <= '" + req.body.endDate + "'"
    + "GROUP BY membership_details.name";

  let connection;
  pool
  .then(async (conn) => {
    connection = conn;
    let memCounts = await conn.query(sqlGetEnrollment).then((results) => {
      console.log(results);
      return results;
    })

    enrollData = {};

    for (let i = 0; i < memCounts.length; i++) {
      enrollData[memCounts[i].name] = memCounts[i].count;
    }

    res.send(enrollData);
  })
  .catch((err) => {
    console.error(err);
  });
});

router.post("/dashboard/gethours", async (req, res) => {  
  // req should have start date, end date, and location

  /*
    Sample output

    {
      "1": 2.5833,
      "3": 1.5833
    }
  */

  const sqlGetHoursByRange = "SELECT SUM(TIMESTAMPDIFF(second, check_in, check_out) / 3600) AS `total`, user_id FROM check_in_check_out"
  + " WHERE check_in >='" + req.body.startDate + "'"
  + " AND" + " check_out <= '" + req.body.endDate + "'"
  + " AND" + " location = '" + req.body.location + "'"
  + " GROUP BY user_id";

  let sqlGetHours = sqlGetHoursByRange;

  if (req.body.startDate.slice(0, 10) == req.body.endDate.slice(0, 10)) {
    const startOfDay = ' 00:00:00';
    const endOfDay = ' 23:59:59';
    const newCheckIn = req.body.startDate.replace(req.body.startDate.slice(10), startOfDay);
    const newCheckOut = req.body.endDate.replace(req.body.endDate.slice(10), endOfDay);

    sqlGetHours = "SELECT SUM(TIMESTAMPDIFF(second, check_in, check_out) / 3600) AS `total`, user_id FROM check_in_check_out"
    + " WHERE check_in >='" + newCheckIn + "'"
    + " AND" + " check_out <= '" + newCheckOut + "'"
    + " AND" + " location = '" + req.body.location + "'"
    + " GROUP BY user_id";
  }

  let connection;
  pool
  .then( async (conn) => {
    connection = conn;
    let resData = await conn.query(sqlGetHours).then((results) => {
      console.log('results', results)
      return results;
    });

    hourData = {};

    for (let i = 0; i < resData.length; i++) {
      hourData[resData[i].user_id] = resData[i].total;
    }

    res.send(hourData);
  })
  .catch((err) => {
    console.error(err);
  });
});

router.post("/dashboard/getvisitors", async (req, res) => {
  // Get total number of vistors by the hour for a given time frame - start date and end date + location
  // If start date and end date are same, get total vistors for that day by the hour  
  // req should have start date, end date, and location

  // Create hour buckets based on start and end date
  // For each bucket, get total number of vistors for that bucket and location


  /*
    Sample output

    {
      "2023-04-25 00:00:00": 0,
      "2023-04-25 01:00:00": 0,
      "2023-04-25 02:00:00": 0,
      "2023-04-25 03:00:00": 0,
      "2023-04-25 04:00:00": 0,
      "2023-04-25 05:00:00": 0,
      "2023-04-25 06:00:00": 0,
      "2023-04-25 07:00:00": 0,
      "2023-04-25 08:00:00": 0,
      "2023-04-25 09:00:00": 0,
      "2023-04-25 10:00:00": 1,
      "2023-04-25 11:00:00": 1,
      "2023-04-25 12:00:00": 0,
      "2023-04-25 13:00:00": 0,
      "2023-04-25 14:00:00": 0,
      "2023-04-25 15:00:00": 0,
      "2023-04-25 16:00:00": 0,
      "2023-04-25 17:00:00": 0,
      "2023-04-25 18:00:00": 0,
      "2023-04-25 19:00:00": 0,
      "2023-04-25 20:00:00": 0,
      "2023-04-25 21:00:00": 0,
      "2023-04-25 22:00:00": 0,
      "2023-04-25 23:00:00": 0,
    }

  */

  pool
  .then(async (conn) => {
    let connection;
    connection = conn;

    const startOfFirstHour = ' 00:00:00';
    const endOfFirstHour = ' 00:59:59';
    let bucketStart = req.body.startDate.replace(req.body.startDate.slice(10), startOfFirstHour);
    let bucketEnd = req.body.startDate.replace(req.body.startDate.slice(10), endOfFirstHour);
  
    let vistorsData = {};
  
    let bucketStartDate = new Date(bucketStart);
    let bucketEndDate = new Date(bucketEnd);
    let finalEndDate = new Date (req.body.endDate);

    // Some reason Date contructor adds 7 hours to date time string, reverting it here
    bucketStartDate.setHours(bucketStartDate.getHours()-7);
    bucketEndDate.setHours(bucketEndDate.getHours()-7);
    finalEndDate.setHours(finalEndDate.getHours()-7);

    // console.log('bucketStart before loop', bucketStart);
    // console.log('bucketEnd before loop', bucketEnd);
  
    while (bucketEndDate <= finalEndDate) {
      bucketStart = bucketStartDate.toISOString().slice(0, 19).replace('T', ' ');
      bucketEnd = bucketEndDate.toISOString().slice(0, 19).replace('T', ' ');

      // console.log('bucketStart after update', bucketStart);
      // console.log('bucketEnd after update', bucketEnd);

      const sqlGetVistorByBucket = "SELECT COUNT(user_id) AS `count` FROM check_in_check_out"
        + " WHERE location ='" + req.body.location + "'"
        + " AND" + " check_in >= '" + bucketStart + "'"
        + " AND" + " check_in <= '" + bucketEnd + "'";

      let count = await conn.query(sqlGetVistorByBucket).then((results) => {
        return results[0].count
      });

      // console.log('number of vistors found between ' + bucketStart + ' and ' + bucketEnd, count);

      vistorsData[bucketStart] = count;

      // Increment the bucket by one hour
      bucketStartDate.setHours(bucketStartDate.getHours()+1);
      bucketEndDate.setHours(bucketEndDate.getHours()+1); 
    }

    // console.log('vistor data after loop', vistorsData)
    res.send(vistorsData);
  })
  .catch((err) => {
    console.error(err);
  });
});

router.post("/getallusers", async (req, res) => {
  console.log('get all');
  const sqlGetAllUsers = "SELECT * from users";

  pool
    .then((p) => p.getConnection())
    .then((p) => {
      connection = p;
      connection.beginTransaction();
      data = connection.query(sqlGetAllUsers);
      return data;
    })
    .then((results) => {
      console.log(results);
      if (results.affectedRows === 0) {
        throw new Error(`User ${req.body.userID} could not be checked out!`);
      }
      res.status(HttpCodes.OK).send(results);
      res.status(HttpCodes.OK).send({ message: `User ${req.body.userID} checked out!` });
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
