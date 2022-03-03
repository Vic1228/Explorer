var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "explorer2",
});

connection.connect(function (error) {
  if (!!error) {
    console.log("連結失敗！");
    console.log(error);
  } else {
    console.log("已成功連結資料庫！");
  }
});

const query = (sql, values) => {
  return new Promise((reslove, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (error, rows) => {
          if (error) {
            reject(error);
          } else {
            reslove(rows);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = connection;
