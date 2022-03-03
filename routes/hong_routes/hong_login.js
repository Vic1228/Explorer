var express = require("express");
var signupRouter = express.Router();
var mysql = require("mysql");

// bodyparser
var bodyParser = require("body-parser");
signupRouter.use(bodyParser.urlencoded({ extended: true }));
signupRouter.use(bodyParser.json());

var connection = require("../db.js");

signupRouter.get("/", function (req, res) {
  connection.query(`SELECT * FROM trips`, function (error, rows) {
    console.log(rows);
  });
  res.render("hong_signup.ejs");
});

signupRouter.post("/", function (req, res) {
  connection.query(`SELECT * FROM trips`, function (error, rows) {
    console.log(rows);
  });
  res.render("hong_signup.ejs");
});

module.exports = signupRouter;
