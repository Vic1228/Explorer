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
const { reject } = require("bluebird");
const promise = require("bluebird/js/release/promise");
const { resolve } = require("path");

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
    cb(null, "photo" + photoNumber + ".jpg");
  },
});

// 照片上傳設定
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
// 照片上傳設定

function getNumber(num) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT number FROM tripchatboard ORDER BY tripchatboard.number DESC LIMIT 1",
      (err, result) => {
        photoNumber = result[0].number;
        photoNumber += 2;
      }
    );
    resolve({ num: photoNumber });
  });
}

getNumber();

module.exports = router;
