var express = require("express");
var lu_createTrip_router = express.Router();
var app = express();
var session = require('express-session');


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", //if mac ,須設定為root
  database: "explorer",
  port: "3306",
});
connection.connect((err) => {
  if (err) throw err
  console.log('學期success')
})


// ============= form ===============

// 查詢users表的資料

// TODO:
var userProfile;
var userStats;
lu_createTrip_router.get("/", function (req, res) {

  //  user判斷
  let test1 = `SELECT * FROM users`;
  connection.query(test1, (err, results, fields) => {

    if (err) throw err;
    userProfile = results[0];

    
    let test2 = `SELECT * FROM userstats`;
    connection.query(test2, (err, results2, fields) => {
      if (err) throw err;
      userStats = results2[0];
      var obj = Object.assign(userStats, userProfile);
      // use ejs
      res.render('lu_createTrip', obj);
    });
    });
});

// 傳送表單的資料進資料庫

lu_createTrip_router.post("/response", function (req, res) {
  console.log('hi')
  let trip = req.body.trip;
  let schedule = req.body.schedule;
  let private = req.body.private;
  let shared = req.body.shared;



  //  trip
  // 查詢舊的tripId存入變數
  var tripId;
  connection.query(
    "SELECT * FROM trips WHERE tripId",
    function (error, results) {
      if (error) throw error;
      else {
        tripId = results[results.length - 1].tripId;
      };
      let tripSQL = `INSERT INTO trips (tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
        VALUES ("${trip[0]}", "1", "${trip[2]}", "${trip[3]}", "${trip[1]}")`;
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
      };

      // private
      for (var i = 0; i < private.length; i += 2) {
        let privateSQL = `INSERT INTO privateItems (tripId, privateItem, ItemCount) 
          VALUES ("${tripId}", "${private[i + 0]}", "${private[i + 1]}")`;
        connection.query(privateSQL, (err, result, fields) => {
          if (err) throw err;
        });
      };

      // shared
      for (var i = 0; i < shared.length; i += 2) {
        let sharedSQL = `INSERT INTO sharedItems (tripId, userId, sharedItem, itemCount) 
          VALUES ("${tripId}", "", "${shared[i + 0]}", "${shared[i + 1]}")`;
        connection.query(sharedSQL, (err, result, fields) => {
          if (err) throw err;
        });
      };
    });
    res.render("lu_createFormComplete.ejs");
  // 渲染
});

module.exports = lu_createTrip_router;