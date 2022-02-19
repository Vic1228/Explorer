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

// 呂學奇 creatTrip Form post / action: /response
app.post("/response", (req, res) => {
  // req.body => body parser
  let data = req.body;
  // let data = req.body;
  // let data = req.body;
  // let data = req.body;
  connection.query("INSERT INTO VALUES(?)", data.toString(), function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  })
  // 渲染
  res.render("createFormComplete.ejs");
})

//  測試用 by 學奇
//     connection.query("INSERT INTO `names` (name) VALUES (?)", username.toString(), function(err, result){
  //         if(err) throw err;
  //             console.log("1 record inserted");
  //         });
  //     res.send(username);
  // });
  //  測試用 by 學奇




// 拿到node

connection.end();

// 
