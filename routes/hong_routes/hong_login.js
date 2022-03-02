var express = require("express");
var signupRouter = express.Router();
var mysql = require("mysql");

// bodyparser
var bodyParser = require("body-parser");
signupRouter.use(bodyParser.urlencoded({ extended: true }));
signupRouter.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", //if mac ,須設定為root
  database: "explorer",
});
connection.connect(function (error) {
    if (!!error) {
      console.log(error);
      console.log("連結資料庫失敗！");
    } else {
      console.log("已成功連結資料庫！");
    //   connection.query(`SELECT * FROM trips`, function (error, rows){
    //     console.log(rows);
    // });
    }
  });
  


  signupRouter.get("/", function (req, res) {
    connection.query(`SELECT * FROM trips`, function (error, rows){
        console.log(rows);
    });
    res.render("hong_signup.ejs");
  });


  signupRouter.post('/',function (req, res){
    connection.query(`SELECT * FROM trips`, function (error, rows){
        console.log(rows);
    });
    res.render('hong_signup.ejs');
  })

module.exports = signupRouter;