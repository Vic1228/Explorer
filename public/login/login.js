
var express = require('express');
var app = express();
var session = require('express-session');
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", //if mac ,須設定為root
  database: "explorer",
});



var compareEmail = 0; // 比對email狀態 1 = true
var databaseUserInformation = [];

// 下面三行設定渲染的引擎模板
app.set('view engine', 'ejs');
app.set('views',  __dirname + "/views"); //設定模板的目錄
// 設定解析模板檔案型別：這裡為html檔案
// app.engine('html', require('ejs').__express); // 使用ejs引擎解析html檔案中ejs語法
// =========== body-parser ===========

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 使用 session 中介軟體
app.use(session({
  secret: 'secret', // 對session id 相關的cookie 進行簽名
  resave: true,
  saveUninitialized: false, // 是否儲存未初始化的會話
  cookie: {
    maxAge: 1000 * 60 * 3, // 設定 session 的有效時間，單位毫秒
  },
}));

// 獲取登入頁面
app.get('/login', function (req, res) {
//   res.sendFile(__dirname + '/login.html') //頁面位置
  res.render("hong_login.ejs");
});
// 獲取註冊頁面
app.get("/signup", function (req, res) {
    res.render("hong_signup.ejs");
});

//連結資料庫
connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    //連接成功接收資料庫資料
    connection.query(`SELECT * FROM users`, function (err, rows) {
      databaseUserInformation = rows;
    })
    console.log('database is working');

  }
});

// 使用者登入
app.post('/login', function (req, res) {
  databaseUserInformation.forEach(item => {
    if (req.body.username == item.userAccount && req.body.userpassword == item.userPassword) {
      req.session.userName = req.body.username; // 登入成功，設定 session
      // res.render('/', { username: req.session.userName });
      res.send("SUCCESS")
      compareEmail = 1;
      return false;
    }
  })
  if (compareEmail == 0) {
    console.log('error');
    res.json({ ret_code: 1, ret_msg: '帳號或密碼錯誤' });// 若登入失敗，重定向到登入頁面
  }
});

// 使用者註冊
app.post('/register', function (req, res) {
  compareEmail = 0; //狀態初始
  databaseUserInformation.forEach(item => {
    if (item.email == req.body.useremail) {
      //帳號已存在
      compareEmail = 1;
      return false;
    }
  })
  //將資料存入資料庫
  if (compareEmail == 0) {
    //可以註冊帳號
    connection.query(`INSERT INTO users (userId, userName, userAccount, userPassword, userPhoto, userPhone, userEmail, userExprnience) VALUES ('5', '${req.body.username}', '${req.body.useremail}', '${req.body.userpassword}', '', '', '', '')`, (error, rows) => {
      if (error) {
        console.log(error);
      }
    })
  };
  res.redirect('/login'); //跳轉頁面
})

// 使用者忘記密碼
app.post('/forgetpassword', function (req, res) {
  databaseUserInformation.forEach(item => {
    if (req.body.useremail == item.useremail) {
      let forgetuserpassword = rows.userpassword;
      res.render('/login', userpassword = forgetuserpassword);
    }
  });
})

//獲取主頁
app.get('/', function (req, res) {
  if (req.session.userName) { //判斷session 狀態，如果有效，則返回主頁，否則轉到登入頁面
    res.render('home', { username: req.session.userName });
  } else {
    res.redirect('login');
  }
})

//退出
app.get('/logout', function (req, res) {
  req.session.userName = null; // 刪除session
  res.redirect('login');
});
app.listen(3001, function () {
  console.log('http://127.0.0.1:3001')
})

