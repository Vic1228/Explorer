var express = require('express');
var app = express();
app.listen(3000);

// ============== ejs ================
app.set('view enjine','ejs');
app.set('views',__dirname + '/views');

// =========== body-parser ===========
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// ============= mysql ===============
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      //if mac ,須設定為root
  database: "explorer",
});
connection.connect();

// ============= router ===============
var router = require('./routes/router.js');
app.use('/',router);

// ============= static file ===============
app.use(express.static(__dirname));
app.use(express.static("image"));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("nav"));
app.use(express.static("footer"));

// 呂學奇 creatTrip Form post
app.post("/response", (req, res) => {
  // body parser顯示在終端機
  console.log(req.body);
  // 渲染
  res.render("ok.ejs");
})

// 拿到node

connection.end();
