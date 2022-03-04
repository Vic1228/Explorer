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

router.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM ( trips INNER JOIN tripmembers ON trips.tripId = tripmembers.tripId INNER JOIN users ON tripmembers.userId = users.userId) INNER JOIN spots ON trips.spotId = spots.spotId WHERE tripmembers.positionState = 2 AND trips.spotId = ${req.query.id}`,
    (error, results1) => {
      if (error) throw error;
      else {
        connection.query(
          "SELECT S.spotName,T.spotId FROM spots AS S JOIN trips AS T ON S.spotId = T.spotId GROUP BY T.spotId",
          (error, results2) => {
            if (error) throw error;
            else {
              connection.query(
                "SELECT DISTINCT DATEDIFF (tripEndDate , tripStartDate) +1 AS Date FROM trips ORDER BY Date ASC ",
                (error, results3) => {
                  if (error) throw error;
                  else {
                    res.render("han_trips.ejs", {
                      data1: results1,
                      data2: results2,
                      data3: results3,
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

// res.render("han_trips.ejs", { data: results, moment });

module.exports = router;
