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
const session = require("express-session");
const { Session } = require("express-session");
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
var spotId;
router.get("/spotId", function (req, res) {
  spotId = req.query.id;
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
                    photoNumber = results3[0].number;
                    photoNumber++;
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

router.post("/uploadPhoto", upload.array("file", 5), (req, res) => {
  connection.query(
    "SELECT * FROM tripchatboard ORDER BY tripchatboard.number DESC",
    (error, results) => {
      if (error) throw error;
      else {
        photoNumber++;
        console.log(photoNumber);
        res.end();
      }
    }
  );
});

router.post("/uploadText", (req, res) => {
  var userId = req.session.userId;
  var userName = req.session.userName;
  var chatTime = new Date();
  var sql =
    "insert into tripchatboard set spotId=?,userId=?,chatTime=?,chatMessage=?,chatImgNum=?";
  var addVaule = [spotId, userId, chatTime, req.body.inputText, photoNumber];

  connection.query(sql, addVaule, (error, results) => {
    if (error) throw error;
    else {
      res.send({
        data1: userName,
        data2: req.body.inputText,
        data3: photoNumber,
        data4: chatTime,
        data5: userId,
        moment,
      });
    }
  });
});

module.exports = router;
