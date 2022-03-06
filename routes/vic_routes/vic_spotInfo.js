var express = require("express");
var router = express.Router();

const ejs = require("ejs");

const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const app = express();
var connection = require("../db.js");

var moment = require("moment");
app.locals.moment = require("moment");

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/upload"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var photoNumber;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    photoNumber += 2;
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
    `SELECT * FROM tripchatboard JOIN users ON tripchatboard.userId = users.userId WHERE tripchatboard.spotId =${req.query.id}`,
    (error, results) => {
      if (error) throw error;
      else {
        connection.query(
          `SELECT * FROM spots WHERE spots.spotId = ${req.query.id}`,
          (error, results2) => {
            if (error) throw error;
            else {
              connection.query(
                `SELECT number FROM tripchatboard ORDER BY tripchatboard.number DESC LIMIT 1`,
                (error, results3) => {
                  if (error) throw error;
                  else {
                    res.render(`vic_spotinfo.ejs`, {
                      data: results,
                      data2: results2,
                      data3: results3,
                      sessionUserId: req.session.userId,
                      moment,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
