var express = require("express");
var router = express.Router();

const ejs = require("ejs");
const moment = require("moment");
const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const app = express();
var connection = require("../db.js");

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

router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM tripchatboard JOIN users ON tripchatboard.userId = users.userID",
    function (error, results) {
      if (error) throw error;
      else {
        res.render("vic_spotinfo.ejs", { AA: results });
        photoNumber = results[results.length - 1].chatId;
      }
    }
  );
});

app.post("/", () => {
  console.log("123");
});

module.exports = router;
