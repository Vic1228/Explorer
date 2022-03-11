// 記得打開mysql apache
var express = require("express");
var router = express.Router();
var app = express();
var session = require("express-session");
var flash = require("connect-flash");
const nodemailer = require('nodemailer')

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

app.use(flash());

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
// =========== nodemail ===========
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: "testmaill0009@gmail.com",
      pass: "testtesttt"
  }
})
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
    if (result[0] !== null&&result[0].islive == 1) {
      console.log(result)
      let id = result[0].userId;
      req.session.userId = id;
      req.session.userName = result[0].userName;
      req.flash("success", "登入成功!!");
      res.redirect("/");
    } else {
      console.log(result)
      req.flash("fail", "登入失敗!!");
      res.redirect("/login");
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

// 使用者註冊
app.post("/register", function (req, res) {
  const name = req.body.username;
  const email = req.body.useremail;
  const password = req.body.userpassword;

  let pass = {
    code: Math.floor(Math.random() * 1000000), //啟用碼，格式自己定義
    date: new Date(Date.now() + 28800000), //註冊日期
  };
  let timee = pass.date.toISOString();
  let timeee = timee.replace("T", " ").split(".")[0];
  // 比對
  const custormers = `insert into users(userName,userEmail,userPassword,islive,signupdate)values('${name}','${email}','${password}','0','${timeee}')`;
  const takeid = `select userId from users where userEmail='${email}'`;
  connection.query(custormers, (err1, result, field) => {
    console.log(err1); //err1
    connection.query(takeid, (err2, result2, field) => {
      console.log(err2); //err2
      const insertid = `insert into userstats (userId) values (${result2[0].userId})`;
      connection.query(insertid, (err3, result3, field) => {
        console.log(err3); //err3
        if (result == undefined) {
          console.log("錯誤，已註冊過");
          res.render("signuperr");
        } else {
          req.session.code = pass.code;
          let code2 = req.session.code;
          console.log(code2);
          // 寄驗證email
          var options = {
            //寄件者
            from: "testemaill0009@gmail.com",
            //收件者
            to: `k603062684@gmail.com`,
            //主旨
            subject: "旅行蝸牛驗證信", // Subject line
            //純文字
            text: "旅行蝸牛驗證信", // plaintext body
            //嵌入 html 的內文
            html: 
            `<h3>感謝您註冊，此為旅行蝸牛認證信</h3>
            <a href="http://localhost:3000/check?email=${email}&code=${code2}">點我進行驗證</a>`,
            //附件檔案
            // attachments: []
          };
          transporter.sendMail(options, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("訊息發送: " + info.response);
            }
          });
          console.log("已新增帳戶");
          req.flash("regisuccess", "註冊成功!!");
          res.redirect("/login");
        }
      });
    });
  });
});

app.get("/check", (req, res) => {
  let codecheck = req.query.code;
  // console.log(req.session.code);
  let email = req.query.email;
  // console.log(email);
  // console.log(codecheck);
  let sql = `select * from users where userEmail = '${email}'`;
  connection.query(sql, (err, result) => {
    let dateori = result[0].signupdate
    let datenow = new Date(Date.now())
    if (req.session.code == codecheck && datenow - dateori < 86400000) {
      connection.query(
        `UPDATE users SET islive ='1' WHERE userEmail = '${email}'`,
        (err, result) => {
          console.log(err);
          console.log("nice");
          res.send("認證成功");
          req.session.code = null;
        }
      );
    } else {
      req.session.code = null;
      console.log("not nice");
      res.send("驗證失敗");
    }
  });
});

//退出
app.get("/logout", function (req, res) {
  req.session.userId = null; // 刪除session
  console.log(req.session.userId);
  res.redirect("/");
});
app.use("/", homepageRouter);
app.use("/", spotInfoRouter);
app.use("/trips", tripsRouter);
app.use("/tripsId", tripsIdRouter);
app.use("/tripsDay", tripsDayRouter);
app.use("/tripsDate", tripsDateRouter);
app.use("/tripinfo", tripsinfoRouter);
app.use("/tripSignup", tripSignup);
app.use("/", yenpage);
app.use("/", createTrip);
app.use("/tripManage", tripManage);
