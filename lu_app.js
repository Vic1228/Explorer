var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
connection.connect();

// 測試查詢用 by 政霖
connection.query("SELECT * from trips", function (err, data, fields) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
// 測試查詢用

connection.end();