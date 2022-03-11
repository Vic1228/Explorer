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
    // //  user判斷
    connection.queryAsync(`SELECT * FROM users WHERE userId = ${req.session.userId}`)
      .then((results1) => {
        userProfile = results1[0];
        //   // 查userstats資料
        let sql1 = `SELECT * FROM userstats WHERE userId = ${req.session.userId}`;
        return connection.queryAsync(sql1);
      })
      .then((results2) => {
        userStats = results2[0];
        let obj = Object.assign(userStats, userProfile, location, login);
        return res.render("lu_createTrip", obj);
      })
      .catch((err) => console.log(err));
    }
  });

    // let test1 = `SELECT * FROM users WHERE userId = ${req.session.userId}`;
    // connection.query(test1, (err, results, fields) => {
    //   userProfile = results[0];

    //   let test2 = `SELECT * FROM userstats WHERE userId = ${req.session.userId}`;
    //   connection.query(test2, (err, results2, fields) => {
    //     userStats = results2[0];
    //     var obj = Object.assign(userStats, userProfile, location, login);
    //     res.render("lu_createTrip", obj);

    //   });
    // });

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
    let selectSpotId = req.body.spotid;
    let tripId;

    // ===================================
    // 傳入 行程簡介
    connection.queryAsync(`INSERT INTO trips (tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
    VALUES ("${trip[0]}", "${spotId || selectSpotId}", "${trip[2]}", "${trip[3]}", "${trip[1]}")`)
      // 找到最新的tripid
      .then(() => {
        let tripSQL = "SELECT * FROM trips";
        return connection.queryAsync(tripSQL);
      })
      // 傳入 行程成員
      .then((results1) => {
        tripId = results1[results1.length - 1].tripId;
        let memberSQL = `INSERT INTO tripmembers (tripId, userId, positionState) 
        VALUES ("${tripId}", "${userId}", 2)`;
        return connection.queryAsync(memberSQL);
      })
      // 如果要寫迴圈 不要用return
      // TODO: 問寫return的用途
      // 傳入 行程表
      .then(() => {
        for (var i = 0; i < schedule.length; i += 3) {
          let scheduleSQL = `INSERT INTO schedule (tripId, day, startTime, activity)
          VALUES ("${tripId}", "${schedule[i + 0]}", "${schedule[i + 1]}", "${schedule[i + 2]}")`;
          connection.queryAsync(scheduleSQL);
        }
      })
      // 傳入 私人裝備
      .then(() => {
        for (var i = 0; i < private.length; i += 2) {
          let privateSQL = `INSERT INTO privateItems (tripId, privateItem, ItemCount) 
            VALUES ("${tripId}", "${private[i + 0]}", "${private[i + 1]}")`;
            connection.queryAsync(privateSQL);
          }
        })
        // 傳入 公用裝備
        .then(() => {
          for (var i = 0; i < shared.length; i += 2) {
            let sharedSQL = `INSERT INTO sharedItems (tripId, userId, sharedItem, itemCount) 
            VALUES ("${tripId}", "${userId}", "${shared[i + 0]}", "${shared[i + 1]}")`;
            connection.queryAsync(sharedSQL);
          }
        })
        // 跳轉填寫完成
        .then(() => {
          return res.render("lu_createFormComplete.ejs");
        })
        .catch((err) => console.log(err));
      }
    
    });
    
    module.exports = lu_createTrip_router;
        
    // ===================================

    //  trip
    //   var tripId;
    //   let tripSQL = `INSERT INTO trips (tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
    // VALUES ("${trip[0]}", "${spotId || selectSpotId}", "${trip[2]}", "${trip[3]}", "${trip[1]}")`;

    //   connection.query(tripSQL, (err, result, fields) => {
    //     if (err) throw err;

    //     // 查詢trip的tripId存入變數
    //     connection.query(
    //       "SELECT * FROM trips",
    //       function (error, results) {
    //         // 得到最後一筆的tripId
    //         tripId = results[results.length - 1].tripId;

    //         // schedule
    //         for (var i = 0; i < schedule.length; i += 3) {

    //           let scheduleSQL = `INSERT INTO schedule (tripId, day, startTime, activity)
    //         VALUES ("${tripId}", "${schedule[i + 0]}", "${schedule[i + 1]}", "${schedule[i + 2]}")`;
    //           connection.query(scheduleSQL, (err, result, fields) => {
    //             if (i == schedule.length) {

    //               // private
    //               for (var j = 0; j < private.length; j += 2) {
    //                 let privateSQL = `INSERT INTO privateItems (tripId, privateItem, ItemCount) 
    //             VALUES ("${tripId}", "${private[j + 0]}", "${private[j + 1]}")`;
    //                 connection.query(privateSQL, (err, result, fields) => {

    //                   if (j == private.length) {
    //                     // shared
    //                     for (var k = 0; k < shared.length; k += 2) {
    //                       let sharedSQL = `INSERT INTO sharedItems (tripId, userId, sharedItem, itemCount) 
    //                                 VALUES ("${tripId}", "${userId}", "${shared[k + 0]}", "${shared[k + 1]}")`;
    //                       connection.query(sharedSQL, (err, result, fields) => {

    //                         if (k == shared.length) {
    //                           // tripmember
    //                           let memberSQL = `INSERT INTO tripmembers (tripId, userId, positionState) 
    //                                 VALUES ("${tripId}", "${userId}", 2)`;
    //                           connection.query(memberSQL, (err, result, fields) => { })
    //                         }
    //                       });
    //                     }
    //                   }
    //                 });
    //               }
    //             }
    //           });
    //         }
    //       });
    //   });
    //   // 渲染
    //   res.render("lu_createFormComplete.ejs");
