var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "explorer",
});

connection.connect(function (error) {
  if (!!error) {
    console.log("連結失敗！");
    console.log(error);
  } else {
    console.log("已成功連結資料庫！");
  }
});

module.exports = connection;
