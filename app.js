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
  password: "", //if mac ,須設定為root
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

// connection.query('SELECT * FROM `trips`',
//   function (err, result, fields) {
//   if(err) throw err;
//   console.log(result);
// });

// 呂學奇 單純寫入資料庫 成功!!
// connection.query("INSERT INTO `trips` SET `tripName`='玉山上吃火鍋', `spotId`='1', `tripStartDate`='2022-12-25', `tripEndDate`='2022-12-26', `tripDesc`='好冷但好爽'",
// function (err, result) {
//   if(err) throw err;
//   console.log(result);
//   });

// TODO: 呂學奇 傳送表單的資料進資料庫

app.post("/response", (req, res) => {
  let trip = req.body.trip;
  let schedule = req.body.schedule;
  let private = req.body.private;
  let shared = req.body.shared;

  console.log(trip);
  // trip[0]活動名稱 trip[1]活動描述 trip[2]開始日期 trip[3]開始日期
  console.log(schedule);
  // schedule[0]
  console.log(private);
  console.log(shared);

  //  trip
  let tripSQL = `INSERT INTO trips (tripId, tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
  VALUES ("", "${trip[0]}", "", "${trip[2]}", "${trip[3]}", "${trip[1]}")`
    connection.query(tripSQL, (err, result, fields) => {
        if (err) throw err;
    });
  //  TODO: schedule
  // let scheduleSQL = `INSERT INTO schedule (tripId, day, startTime, activity) 
  // VALUES ("", "${schedule[0]}", ${schedule[1]}", ${schedule[2]}")`
  //   connection.query(scheduleSQL, (err, result, fields) => {
  //       if (err) throw err;
  //   });
  
    res.render("createFormComplete.ejs");
  })

  