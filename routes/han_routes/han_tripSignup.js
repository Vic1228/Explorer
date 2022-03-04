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
    `insert into tripmembers  SET tripId = ${req.query.id} , userId  = ${req.session.userId},positionState = 0`,
    (error, results) => {
      if (error) throw error;
      else {
        res.redirect("/");
      }
    }
  );
});

// res.render("han_trips.ejs", { data: results, moment });

module.exports = router;
