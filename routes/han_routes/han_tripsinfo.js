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
  if (req.session.userId == undefined) {
    res.redirect("/login");
  } else {
    connection.query(
      `SELECT * FROM ( trips INNER JOIN tripmembers ON trips.tripId = tripmembers.tripId INNER JOIN users ON tripmembers.userId = users.userId) INNER JOIN spots ON trips.spotId = spots.spotId WHERE positionState = 2 AND trips.tripId = ${req.query.id}`,
      (error, results1) => {
        if (error) throw error;
        else {
          connection.query(
            `SELECT * FROM trips JOIN schedule ON trips.tripId = schedule.tripId WHERE trips.tripId = ${req.query.id} GROUP BY schedule.day `,
            (error, results2) => {
              if (error) throw error;
              else {
                connection.query(
                  `SELECT * FROM trips JOIN schedule ON trips.tripId = schedule.tripId WHERE trips.tripId = ${req.query.id} `,
                  (error, results3) => {
                    if (error) throw error;
                    else {
                      connection.query(
                        `SELECT * FROM trips JOIN privateitems ON trips.tripId = privateitems.tripId WHERE trips.tripId = ${req.query.id} `,
                        (error, results4) => {
                          if (error) throw error;
                          else {
                            connection.query(
                              `SELECT * FROM trips JOIN shareditems ON trips.tripId = shareditems.tripId WHERE trips.tripId = ${req.query.id} `,
                              (error, results5) => {
                                if (error) throw error;
                                else {
                                  connection.query(
                                    `SELECT * FROM tripmembers WHERE tripmembers.userId = ${req.session.userId} AND tripmembers.tripId = ${req.query.id}`,
                                    (error, results6) => {
                                      if (error) throw error;
                                      else {
                                        res.render("han_tripinfo.ejs", {
                                          data1: results1,
                                          data2: results2,
                                          data3: results3,
                                          data4: results4,
                                          data5: results5,
                                          data6: results6,
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
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
});

module.exports = router;
