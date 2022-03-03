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
})

// ==================================
// ============= profile ===============
// ==================================
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
    
    // 查userstats資料
    let test2 = `SELECT * FROM userstats`;
    connection.query(test2, (err, results2, fields) => {
      if (err) throw err;
      userStats = results2[0];
      var obj = Object.assign(userStats, userProfile);
      // 渲染到ejs模板
      res.render('lu_createTrip', obj);
    });
  });
});

// ==================================
// ============= form ===============
// ==================================

// 傳送表單的資料進資料庫

lu_createTrip_router.post("/response", function (req, res) {
  // input同name的 分別存入變數
  let trip = req.body.trip;
  let schedule = req.body.schedule;
  let private = req.body.private;
  let shared = req.body.shared;

  console.log(trip);
  console.log(schedule);
  console.log(private);
  console.log(shared);
  
  //  trip
  // 查詢舊的tripId存入變數

  let tripSQL = `INSERT INTO trips (tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
  VALUES ("${trip[0]}", "1", "${trip[2]}", "${trip[3]}", "${trip[1]}")`;
  connection.query(tripSQL, (err, result, fields) => {
    if (err) throw err;
  });

  // connection.query(
  //   "SELECT * FROM trips",
  //   function (error, results) {
  //     if (error) throw error;
  //     else {
  //       // 得到最後一筆的tripId
  //       tripId = results[results.length - 1].tripId;
  //       console.log(tripId);
  //       };
  
  // schedule
  for (var i = 0; i < schedule.length; i += 3) {
      let scheduleSQL = `INSERT INTO schedule (tripId, day, startTime, activity) 
        VALUES ("", "${schedule[i + 0]}", "${schedule[i + 1]}", "${schedule[i + 2]}")`;
      connection.query(scheduleSQL, (err, result, fields) => {
          if (err) throw err;
        });
      };
      
      // private
      for (var i = 0; i < private.length; i += 2) {
          let privateSQL = `INSERT INTO privateItems (tripId, privateItem, ItemCount) 
            VALUES ("", "${private[i + 0]}", "${private[i + 1]}")`;
          connection.query(privateSQL, (err, result, fields) => {
              if (err) throw err;
            });
          };
          
          // shared
          for (var i = 0; i < shared.length; i += 2) {
              let sharedSQL = `INSERT INTO sharedItems (userId, sharedItem, itemCount) 
                VALUES ("", "${shared[i + 0]}", "${shared[i + 1]}")`;
              connection.query(sharedSQL, (err, result, fields) => {
                  if (err) throw err;
        });
      };
      // 渲染
    res.render("lu_createFormComplete.ejs");
  });
    
    
    module.exports = lu_createTrip_router;