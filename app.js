// 記得打開mysql apache
var express = require("express");
var router = express.Router();
var app = express();
var session = require('express-session');
app.listen(3000, (error) => {
  if (error) throw error;
  else {
    console.log("server running in port 3000.");
  }
});

// ============== ejs ================

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// =========== body-parser ===========

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ============= mysql ===============

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", //if mac ,須設定為root
  database: "explorer",
  port: "3306",
});


// ============= router ===============

var router = require("./routes/router.js");
var homepageRouter = require("./routes/vic_routes/vic_homepage");
var spotInfoRouter = require("./routes/vic_routes/vic_spotInfo");
var tripManage = require('./routes/song_routes/song_tripManage');
var createTrip = require('./routes/lu_routes/lu_createTrip')
var yenpage = require('./routes/yen_routes/yen_routes')
// var signupRouter = require('./routes/hong_routes/hong_login')
const { promiseImpl } = require("ejs");
app.use("/", homepageRouter);
app.use("/spotInfo", spotInfoRouter);
app.use("/spotId", spotInfoRouter);
app.use('/tripManage', tripManage);
app.use('/createTrip', createTrip)
app.use('/', createTrip)
app.use('/', yenpage)
app.use("/", router);
// app.use("/signup",signupRouter )

// ============= static file ===============

app.use(express.static(__dirname));
app.use(express.static("image"));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("nav"));
app.use(express.static("footer"));
app.use(express.static("public"));
app.use(express.static("style"));

// ============= session ===============
// session的引用請放這裡

// ============= 呂學奇 ===============
// app.post("/response", function (req, res) {
//     let trip = req.body.trip;
//     let schedule = req.body.schedule;
//     let private = req.body.private;
//     let shared = req.body.shared;

//  trip

// 查詢舊的tripId存入變數
// var tripId;
// var day;
// connection.query(
//   "SELECT * FROM trips WHERE tripId",
//   function (error, results) {
//     if (error) throw error;
//     else {
//       tripId = results[results.length - 1].tripId;
//     }
//     let tripSQL = `INSERT INTO trips (tripId, tripName, spotId, tripStartDate, tripEndDate, tripDesc) 
//     VALUES ("", "${trip[0]}", "1", "${trip[2]}", "${trip[3]}", "${trip[1]}")`;
//     connection.query(tripSQL, (err, result, fields) => {
//       if (err) throw err;
//     });

// schedule
// tripId++;
// for (var i = 0; i < schedule.length; i += 3) {
//   let scheduleSQL = `INSERT INTO schedule (tripId, day, startTime, activity) 
//   VALUES ("${tripId}", "${schedule[i + 0]}", "${schedule[i + 1]}", "${schedule[i + 2]}")`;
//   connection.query(scheduleSQL, (err, result, fields) => {
//     if (err) throw err;
//   });
// }

// private
// for (var i = 0; i < private.length; i += 2) {
//   let privateSQL = `INSERT INTO privateItems (tripId, privateItemName, ItemCount) 
//   VALUES ("${tripId}", "${private[i + 0]}", "${private[i + 1]}")`;
//   connection.query(privateSQL, (err, result, fields) => {
//     if (err) throw err;
//   });
// }

// shared
//       for (var i = 0; i < shared.length; i += 2) {
//         let sharedSQL = `INSERT INTO sharedItems (tripId, userId, sharedItemName, itemCount) 
//         VALUES ("${tripId}", "", "${shared[i + 0]}", "${shared[i + 1]}")`;
//         connection.query(sharedSQL, (err, result, fields) => {
//           if (err) throw err;
//         });
//       }
//     });
//   // 渲染
//   res.render("lu_createFormComplete.ejs");
// });


// 洪碩呈 登入註冊
var compareEmail = 0; // 比對email狀態 1 = true


// =========== body-parser ===========

var bodyParser = require("body-parser");
const { RejectionError } = require("bluebird");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 使用 session 中介軟體
app.use(session({
  secret: 'secret', // 對session id 相關的cookie 進行簽名
  resave: true,
  saveUninitialized: false, // 是否儲存未初始化的會話
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 設定 session 的有效時間，單位毫秒
  },
}));

//連結資料庫
connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('碩成database is working');

  }
});
// 使用者登入(舊)
// app.post('/login', function (req, res) {
//   compareEmail = 0;
//   connection.query(`SELECT * FROM users`, function (err, rows) {
//     console.log(rows)
//     rows.forEach(item => {
//       if (req.body.useremail == item.userEmail && req.body.userpassword == item.userPassword) {
//         console.log(item.userId)
//         req.session.userEmail = req.body.useremail; // 登入成功，設定 session username = email
//         console.log(req.session.userEmail);
//         res.redirect('/');
//         return false
//         console.log(didi)
//       } else {
//         console.log(item.userId)
//         console.log('error');
//         res.json({ ret_code: 1, ret_msg: '帳號或密碼錯誤' });// 若登入失敗，重定向到登入頁面
//       }
//     })
//   })
// });


// 使用者登入(新)
app.post("/login", function (req, res) {
  const email = req.body.useremail;
  const password = req.body.userpassword;
  req.session.userEmail = req.body.useremail;
  const member = `select * from users where userEmail='${email}'and userPassword='${password}'`;
  // 比對
  connection.query(member, function (err, result, fields) {
    if (result[0] == null) {
      res.redirect('/login');
    } else {
      console.log("success!");
      console.log(req.session.userEmail)
      res.redirect("/");
    }
  })
});

// 使用者註冊
// app.post('/register', function (req, res) {  // /register從註冊頁面 form的action
//   compareEmail = 0; //狀態初始
//   databaseUserInformation.forEach(item => {
//     if (item.email == req.body.useremail) {
//       //帳號已存在
//       compareEmail = 1;
//       return false;
//     }
//   })
//   //將資料存入資料庫
//   if (compareEmail == 0) {
//     //可以註冊帳號
//     connection.query(`INSERT INTO users (userName,userEmail, userPassword, userPhone, userExp) VALUES ('${req.body.username}', '${req.body.useremail}', '${req.body.userpassword}', '', '')`, (error, rows) => {
//       if (error) {
//         console.log(error);
//       }
//     })
//   };
//   res.redirect('/login'); //跳轉頁面
// })
app.post("/register", function (req, res) {
  const name = req.body.username;
  const email = req.body.useremail;
  const password = req.body.userpassword;
  // 比對
  const custormers = `insert into users(userName,userEmail,userPassword)values('${name}','${email}','${password}')`;
  const takeid = `select userId from users where userEmail='${email}'`;

  connection.query(custormers, (err, result, field) => {
    connection.query(takeid, (err, result2, field) => {
      console.log(result2)
      const insertid = `insert into userstats (userId) values (${result2[0].userId})`;
      connection.query(insertid, (err, result3, field) => {
        console.log(err)
        console.log(result3)
        if (result == undefined) {
          console.log("錯誤，已註冊過");
          res.render('signuperr')
        } else {
          console.log("1 record inserted");
          res.redirect('/')
        }
      });
    });
  });
});
// 使用者忘記密碼
// app.post('/forgetpassword', function (req, res) {
//   databaseUserInformation.forEach(item => {
//     if (req.body.useremail == item.useremail) {
//       let forgetuserpassword = rows.userpassword;
//       res.render('/login', userpassword = forgetuserpassword);
//     }
//   });
// })

//退出
app.get('/logout', function (req, res) {
  req.session.userEmail = null; // 刪除session
  console.log(req.session.userEmail);
  res.redirect('/');
});

app.use('/', yenpage)