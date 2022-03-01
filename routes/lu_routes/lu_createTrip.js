var express = require("express");
var lu_createTrip_router = express.Router();


// 呂學奇
lu_createTrip_router.get("/", function (req, res) {
  res.render("lu_createTrip.ejs");
});

// ============= form ===============

// 查詢users表的資料
// connection.query("SELECT userName,userPhone,userEmail,userExperience FROM users WHERE userId = 1", function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });

// 傳送表單的資料進資料庫


lu_createTrip_router.post("/response", function (req, res) {
  let trip = req.body.trip;
  let schedule = req.body.schedule;
  let private = req.body.private;
  let shared = req.body.shared;

  //  trip

  // 查詢舊的tripId存入變數
  var tripId;
  var day;
  connection.query(
    "SELECT * FROM trips WHERE tripId",
    function (error, results) {
      if (error) throw error;
      else {
        tripId = results[results.length - 1].tripId;
      }
      let tripSQL = `INSERT INTO trips (tripId, tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
        VALUES ("", "${trip[0]}", "1", "${trip[2]}", "${trip[3]}", "${trip[1]}")`;
      connection.query(tripSQL, (err, result, fields) => {
        if (err) throw err;
      });

      // schedule
      tripId++;
      for (var i = 0; i < schedule.length; i += 3) {
        let scheduleSQL = `INSERT INTO schedule (tripId, day, startTime, activity) 
          VALUES ("${tripId}", "${schedule[i + 0]}", "${schedule[i + 1]}", "${schedule[i + 2]}")`;
        connection.query(scheduleSQL, (err, result, fields) => {
          if (err) throw err;
        });
      }

      // private
      for (var i = 0; i < private.length; i += 2) {
        let privateSQL = `INSERT INTO privateItems (tripId, privateItemName, ItemCount) 
          VALUES ("${tripId}", "${private[i + 0]}", "${private[i + 1]}")`;
        connection.query(privateSQL, (err, result, fields) => {
          if (err) throw err;
        });
      }

      // shared
      for (var i = 0; i < shared.length; i += 2) {
        let sharedSQL = `INSERT INTO sharedItems (tripId, userId, sharedItemName, itemCount) 
          VALUES ("${tripId}", "", "${shared[i + 0]}", "${shared[i + 1]}")`;
        connection.query(sharedSQL, (err, result, fields) => {
          if (err) throw err;
        });
      }
    });
  // 渲染
  res.render("lu_createFormComplete.ejs");
});


module.exports = lu_createTrip_router;