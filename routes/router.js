var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", //if mac ,須設定為root
  database: "explorer",
});

// 洪碩呈開始
router.get("/map", function (req, res) {
  res.render("hong_map.ejs");
});

router.get("/login", function (req, res) {
  res.render("hong_login.ejs");
});
router.get("/signup", function (req, res) {
  res.render("hong_signup.ejs");
  });
// 洪碩呈
// router.post("/register", (req, res) => {
//   // 將資料INSERT INTO上去
//   console.log(req.body.signup);
//   res.redirect("/hong_signup.ejs");
// });

// 傅意涵開始
router.get("/trips", function (req, res) {
  res.render("han_trips.ejs");
});

router.get("/tripInfo", function (req, res) {
  res.render("han_tripInfo.ejs");
});
// 傅意涵

//仲硯


// 呂學奇
router.get("/createTrip", function (req, res) {
  res.render("lu_createTrip.ejs");
});

// 呂學奇


// 葉宜松
module.exports = router;
