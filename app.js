// 記得打開mysql apache
// mac使用者請看23行 設定mysql密碼
var express = require("express");
var app = express();
app.listen(3000, () => {
  console.log("server running");
});

// ============== ejs ================
app.set("view enjine", "ejs");
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

// ============= router ===============
var router = require("./routes/router.js");
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
connection.connect();

connection.query("SELECT * FROM `users`", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

// 呂學奇 傳送表單的資料進資料庫

app.post("/response", (req, res) => {
  let trip = req.body.trip;
  let schedule = req.body.schedule;
  let private = req.body.private;
  let shared = req.body.shared;

  //  trip
  let tripSQL = `INSERT INTO trips (tripId, tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
  VALUES ("", "${trip[0]}", "", "${trip[2]}", "${trip[3]}", "${trip[1]}")`;
  connection.query(tripSQL, (err, result, fields) => {
    if (err) throw err;
  });

  //  TODO: schedule
  // tripId不能共用的問題
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
