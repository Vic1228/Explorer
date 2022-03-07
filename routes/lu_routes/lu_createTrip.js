var express = require("express");
var session = require("express-session");
var lu_createTrip_router = express.Router();
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection = require("../db.js");
const { NULL } = require("mysql/lib/protocol/constants/types");

// ==================================
// ============= profile ============
// ==================================
// 查詢users表的資料

var userProfile, userStats, spotId, x, y, login;
lu_createTrip_router.get("/createTrip", function (req, res) {
  // 政霖 id , x , y
  spotId = req.query.id;
  location = { lat: req.query.x, lng: req.query.y };
  login = { sessionUserId: req.session.userId }

  var userId = req.session.userId;
  if (req.session.userId == undefined) {
    res.redirect("/login");
  } else {
    
    //  user判斷
    let test1 = `SELECT * FROM users WHERE userId = ${req.session.userId}`;
    connection.query(test1, (err, results, fields) => {
      if (err) throw err;
      userProfile = results[0];
      console.log("userProfile",userProfile, typeof(userProfile));

    // 查userstats資料
    let test2 = `SELECT * FROM userstats WHERE userId = ${req.session.userId}`;
    connection.query(test2, (err, results2, fields) => {
      if (err) throw err;
      userStats = results2[0];
      var obj = Object.assign(userStats, userProfile, location, login);
      //  TODO: 判斷有沒有大於3
      res.render("lu_createTrip", obj);
    });
  });
  }
});

// ==================================
// ============= form ===============
// ==================================


// 傳送表單的資料進資料庫

lu_createTrip_router.post("/response", function (req, res) {
  if (req.session.userId == undefined) {
    res.redirect("/login");
  } else {
  // input同name的 分別存入變數
  let userId = req.session.userId;
  let trip = req.body.trip;
  let schedule = req.body.schedule;
  let private = req.body.private;
  let shared = req.body.shared;
  // 碩呈的local storage
  let spotId = req.body.spotid;

  //  trip
  var tripId;
  let tripSQL = `INSERT INTO trips (tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
  VALUES ("${trip[0]}", "${spotId}", "${trip[2]}", "${trip[3]}", "${trip[1]}")`;
  
  connection.query(tripSQL, (err, result, fields) => {
    if (err) throw err;
    
    // 查詢trip的tripId存入變數
    connection.query(
      "SELECT * FROM trips",
      function (error, results) {
        // 得到最後一筆的tripId
        tripId = results[results.length - 1].tripId;

        // schedule
        for (var i = 0; i < schedule.length; i += 3) {

          let scheduleSQL = `INSERT INTO schedule (tripId, day, startTime, activity)
          VALUES ("${tripId}", "${schedule[i + 0]}", "${schedule[i + 1]}", "${schedule[i + 2]}")`;
          connection.query(scheduleSQL, (err, result, fields) => {
            if (i == schedule.length) {
            
            // private
            for (var j = 0; j < private.length; j += 2) {
              let privateSQL = `INSERT INTO privateItems (tripId, privateItem, ItemCount) 
              VALUES ("${tripId}", "${private[j + 0]}", "${private[j + 1]}")`;
              connection.query(privateSQL, (err, result, fields) => {
                
                if (j == private.length) {
                      // shared
                      for (var k = 0; k < shared.length; k += 2) {
                      let sharedSQL = `INSERT INTO sharedItems (tripId, userId, sharedItem, itemCount) 
                                  VALUES ("${tripId}", "${userId}", "${shared[k + 0]}", "${shared[k + 1]}")`;
                        connection.query(sharedSQL, (err, result, fields) => {

                          if (k == shared.length) {
                            // tripmember
                            let memberSQL = `INSERT INTO tripmembers (tripId, userId, positionState) 
                                  VALUES ("${tripId}", "${userId}", 2)`;
                            connection.query(memberSQL, (err, result, fields) => { })
                          }
                        });
                      }    
                } 
              });
            } 
            }
          });
        }
      });
  });
  // 渲染
  res.render("lu_createFormComplete.ejs");
  }
  
});

module.exports = lu_createTrip_router;
