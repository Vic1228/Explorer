// 記得打開mysql apache
var express = require("express");
var router = express.Router();
var app = express();
app.listen(3000, (error) => {
  if (error) throw error;
  else {
    console.log("server running in port 3000.");
  }
});

// ============== ejs ================

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// =========== body-parser ===========

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ============= mysql ===============

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", //if mac ,須設定為root
  database: "explorer",
  port: "3306",
});
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
    console.log("連結資料庫失敗！");
  } else {
    console.log("已成功連結資料庫！");
  }
});

// ============= router ===============

var router = require("./routes/router.js");
var homepageRouter = require("./routes/vic_routes/vic_homepage");
var spotInfoRouter = require("./routes/vic_routes/vic_spotInfo");
var tripManage = require('./routes/song_routes/song_tripManage')
const { promiseImpl } = require("ejs");
app.use("/", homepageRouter);
app.use("/spotInfo", spotInfoRouter);
app.use("/spotId", spotInfoRouter);
app.use('/tripManage',tripManage);
app.use("/", router);

// ============= static file ===============

app.use(express.static(__dirname));
app.use(express.static("image"));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("nav"));
app.use(express.static("footer"));
app.use(express.static("public"));
app.use(express.static("style"));

// ============= session ===============
// session的引用請放這裡

// ============= form post ===============
// 呂學奇 讀取資料庫 成功!!

// connection.query("SELECT userName,userPhone,userEmail,userExperience FROM users WHERE userId = 1", function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });

// 呂學奇 傳送表單的資料進資料庫

app.post("/response", async function(req, res){
  let trip = req.body.trip;
  let schedule = req.body.schedule;
  let private = req.body.private;
  let shared = req.body.shared;

  //  trip
  
  // let tripSQL = `INSERT INTO trips (tripId, tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
  // VALUES ("", "${trip[0]}", "", "${trip[2]}", "${trip[3]}", "${trip[1]}")`;
  // await connection.query(tripSQL, (err, result, fields) => {
  //   if (err) throw err;
  // });
  
  // 後面三個表去抓tripId

  // select * from table order by Sn desc limit 0,1
  // let tripIdSQL = `SELECT * FROM trips order by Sn desc limit 0,1`;
  // connection.query(tripIdSQL, (err, result, fields) => {
  //   if (err) throw err;
  //   console.log(result);
  // })
  

  //  TODO: schedule
  // tripId不能共用的問題 因為join是取資料用的
  // input name取一樣的 在拆開來存?

  for (var i = 0; i < schedule.length; i += 3) {
    let scheduleSQL = `INSERT INTO schedule (day, startTime, activity) 
  VALUES ("${schedule[i + 0]}", "${schedule[i + 1]}", "${schedule[i + 2]}")`;
    connection.query(scheduleSQL, (err, result, fields) => {
      if (err) throw err;
    });
  }

  //  TODO: private
  for (var i = 0; i < private.length; i += 2) {
    let privateSQL = `INSERT INTO privateItems (tripId, privateItemName, ItemCount) 
  VALUES ("", "${private[i + 0]}", "${private[i + 1]}")`;
    connection.query(privateSQL, (err, result, fields) => {
      if (err) throw err;
    });
  }

  //  TODO: shared

  for (var i = 0; i < shared.length; i += 2) {
    let sharedSQL = `INSERT INTO sharedItems (tripId, userId, sharedItemName, itemCount) 
  VALUES ("", "", "${shared[i + 0]}", "${shared[i + 1]}")`;
    connection.query(sharedSQL, (err, result, fields) => {
      if (err) throw err;
    });
  }

  res.render("lu_createFormComplete.ejs");
});