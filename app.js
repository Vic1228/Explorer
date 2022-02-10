var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "explorer",
});

connection.connect();

connection.query("SELECT * from trips", function (err, data, fields) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
});

connection.end();
