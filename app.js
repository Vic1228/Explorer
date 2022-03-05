// 記得打開mysql apache
var express = require("express");
var router = express.Router();
var app = express();
var session = require("express-session");
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
var connection = require("./routes/db.js");

// ============= router ===============
const { promiseImpl } = require("ejs");
var router = require("./routes/router.js");
app.use("/", router);
// 政霖
var homepageRouter = require("./routes/vic_routes/vic_homepage");
var spotInfoRouter = require("./routes/vic_routes/vic_spotInfo");
var uploadRouter = require("./routes/vic_routes/vic_upload");
app.use("/", homepageRouter);

// 意涵
var tripsRouter = require("./routes/han_routes/han_trips.js");
var tripsIdRouter = require("./routes/han_routes/han_tripsId.js");
var tripsDayRouter = require("./routes/han_routes/han_tripsDay.js");
var tripsDateRouter = require("./routes/han_routes/han_tripsDate.js");
var tripsinfoRouter = require("./routes/han_routes/han_tripsinfo.js");
var tripSignup = require("./routes/han_routes/han_tripSignup.js");

// 學奇
var createTrip = require("./routes/lu_routes/lu_createTrip");

// 仲晏
var yenpage = require("./routes/yen_routes/yen_routes");

// 宜松
var tripManage = require("./routes/song_routes/song_tripManage");

// ============= static file ===============
app.use(express.static(__dirname));
app.use(express.static("image"));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(express.static("nav"));
app.use(express.static("footer"));
app.use(express.static("public"));
app.use(express.static("style"));

// =========== body-parser ===========

var bodyParser = require("body-parser");
const { RejectionError } = require("bluebird");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 使用 session 中介軟體
app.use(
  session({
    secret: "secret", // 對session id 相關的cookie 進行簽名
    resave: true,
    saveUninitialized: true, // 是否儲存未初始化的會話
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // 設定 session 的有效時間，單位毫秒
    },
  })
);

//連結資料庫

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
  const member = `select * from users where userEmail='${email}'and userPassword='${password}'`;
  // 比對
  connection.query(member, function (err, result, fields) {
    if (result[0] == null) {
      res.redirect("/login");
    } else {
      let id = result[0].userId;
      req.session.userId = id;
      //
      console.log(req.session.userId);
      console.log("login success!");
      res.redirect("/");
    }
  });
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
  connection.query(custormers, (err1, result, field) => {
    console.log(err1);
    connection.query(takeid, (err2, result2, field) => {
      console.log(err2);
      const insertid = `insert into userstats (userId) values (${result2[0].userId})`;
      connection.query(insertid, (err3, result3, field) => {
        console.log(err3);
        if (result == undefined) {
          console.log("錯誤，已註冊過");
          res.render("signuperr");
        } else {
          console.log("1 record inserted");
          res.redirect("/");
        }
      });
    });
  });
});

//退出
app.get("/logout", function (req, res) {
  req.session.userId = null; // 刪除session
  console.log(req.session.userId);
  res.redirect("/");
});
app.use("/spotId", spotInfoRouter);
app.use("/upload", uploadRouter);
app.use("/trips", tripsRouter);
app.use("/tripsId", tripsIdRouter);
app.use("/tripsDay", tripsDayRouter);
app.use("/tripsDate", tripsDateRouter);
app.use("/tripinfo", tripsinfoRouter);
app.use("/tripSignup", tripSignup);
app.use("/", yenpage);
app.use("/", createTrip);
app.use("/tripManage", tripManage); 
