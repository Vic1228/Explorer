var express = require("express");
var router = express.Router();

const ejs = require("ejs");
const moment = require("moment");
const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/upload"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.moment = require("moment");

var photoNumber;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    photoNumber++;
    cb(null, "photo" + photoNumber + ".jpg");
  },
});
const upload = multer({
  storage: storage,
  dest: "upload/",
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    if (!file.mimetype.match(/^image/)) {
      callback((new Error().message = "檔案格式錯誤"));
    } else {
      callback(null, true);
    }
  },
});

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", //if mac ,須設定為root
  database: "explorer",
  port: "3306",
});

router.post("/", upload.array("photo", 5), (req, res) => {
  console.log(req.body.photo);
  var chatTime = new Date();
  var sql =
    "insert into tripchatboard set tripId=?,userId=?,chatTime=?,chatMessage=?,chatPhoto=?";
  var addVaule = ["", "2", chatTime, req.body.content, photoNumber];
  connection.query(sql, addVaule, function (err, result) {
    if (err) {
      console.log(err);
      console.log("新增資料失敗");
    }
    res.redirect("/spotid");
  });
});

// router.post("/", () => {
//   console.log("123");
// });

module.exports = router;
