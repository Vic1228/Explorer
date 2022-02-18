// 透過express架設伺服器
const express = require('express');
const app = express();

// express的模組化路由方法
const router = express.Router();

// 靜態檔案
app.use(express.static(__dirname));

// "image"就是資料夾
app.use(express.static("image"));
app.use(express.static("css"));
app.use(express.static("js"));

// 資料庫
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
connection.connect();

// 設定主路由/
app.get('/', function (req, res) {
    // 印出資訊
    res.send("express is fun!")
})

connection.end();

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});