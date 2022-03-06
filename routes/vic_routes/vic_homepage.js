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

router.get("/", function (req, res) {
  connection.query(
    `SELECT * FROM ( trips INNER JOIN tripmembers ON trips.tripId = tripmembers.tripId INNER JOIN users ON tripmembers.userId = users.userId) INNER JOIN spots ON trips.spotId = spots.spotId WHERE tripmembers.positionState = 2 AND spots.spotArea = 'North' `,
    (error, results1) => {
      if (error) throw error;
      else {
        res.render("vic_homepage.ejs", {
          data1: results1,
          messages: req.flash("success"),
          sessionUserId: req.session.userId,
        });
      }
    }
  );
});
// res.render("vic_homepage.ejs");
module.exports = router;
