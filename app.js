// 記得打開mysql apache
// mac使用者請看27行 設定mysql密碼
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
  password: "", //if mac ,須設定為root
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
const { promiseImpl } = require("ejs");
var router = require("./routes/router.js");
app.use("/", router);
// 政霖
var homepageRouter = require("./routes/vic_routes/vic_homepage");
var spotInfoRouter = require("./routes/vic_routes/vic_spotInfo");
var uploadRouter = require("./routes/vic_routes/vic_upload");
app.use("/", homepageRouter);
app.use("/spotId", spotInfoRouter);
app.use("/upload", uploadRouter);

// 學奇
var createTrip = require("./routes/lu_routes/lu_createTrip");
app.use("/createTrip", createTrip);
app.use("/", createTrip);

// 仲晏
var yenpage = require("./routes/yen_routes/yen_routes");
app.use("/", yenpage);

// 宜松
var tripManage = require("./routes/song_routes/song_tripManage");
app.use("/tripManage", tripManage);
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
