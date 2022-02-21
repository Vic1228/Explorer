// 記得打開mysql apache
// mac使用者請看23行 設定mysql密碼

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

// ============= session ===============
// session的引用請放這裡



// 呂學奇 讀取資料庫 成功!!
connection.connect();

connection.query('SELECT * FROM `trips`',
  function (err, result, fields) {
  if(err) throw err;
  console.log(result);
});

// 呂學奇 寫入資料庫 成功!!
// connection.query("INSERT INTO `trips` SET `tripName`='玉山上吃火鍋', `spotId`='1', `tripStartDate`='2022-12-25', `tripEndDate`='2022-12-26', `tripDesc`='好冷但好爽'",
// function (err, result) {
//   if(err) throw err;
//   console.log(result);
//   });


// TODO: 呂學奇 creatTrip Form post / action: /response


// app.post('/submit',urlencodedParser, function(req, res, next) {
//     console.log(req.body.name);
//     console.log(req.body.email);
//     console.log(req.body.description);
//     con.connect(function(err) {
//   if (err) throw  err;
//   console.log("connected");
//   var sql = "INSERT INTO `form`(`name`,`email`, `description`) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.description+"')";
//   con.query(sql, function(err, result)  {
//    if(err) throw err;
//    console.log("table created");
//   });
// });

//   res.render('index', { title: 'Express' });
// });

connection.end();