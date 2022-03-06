var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  CLIENT_CONNECT_WITH_DB,
} = require("mysql/lib/protocol/constants/client");
const e = require("express");
const { redirect } = require("express/lib/response");

var connection = require("../db.js");

// 獎盃路由
router.get("/trophy", function (req, res) {
  let sql1 =
    "SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by strength desc limit 10";
  let sql2 =
    "SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by heal desc limit 10";
  let sql3 =
    "SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by survival desc limit 10";
  let sql4 =
    "SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by direction desc limit 10";
  let sql5 =
    "SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by leadership desc limit 10";
  let sql6 =
    "SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by teamwork desc limit 10";
  let sql7 =
    "SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by commentCount desc limit 20";
  connection.query(sql1, (err, result1, fields) => {
    if (err) throw err;
    var string1 = JSON.stringify(result1);
    var json1 = JSON.parse(string1);

    connection.query(sql2, (err, result2, fields) => {
      if (err) throw err;
      var string2 = JSON.stringify(result2);
      var json2 = JSON.parse(string2);

      connection.query(sql3, (err, result3, fields) => {
        if (err) throw err;
        var string3 = JSON.stringify(result3);
        var json3 = JSON.parse(string3);

        connection.query(sql4, (err, result4, fields) => {
          if (err) throw err;
          var string4 = JSON.stringify(result4);
          var json4 = JSON.parse(string4);

          connection.query(sql5, (err, result5, fields) => {
            if (err) throw err;
            var string5 = JSON.stringify(result5);
            var json5 = JSON.parse(string5);

            connection.query(sql6, (err, result6, fields) => {
              if (err) throw err;
              var string6 = JSON.stringify(result6);
              var json6 = JSON.parse(string6);

              connection.query(sql7, (err, result7, fields) => {
                if (err) throw err;
                var string7 = JSON.stringify(result7);
                var json7 = JSON.parse(string7);
                // console.log(json7[0]);
                console.log(req.session.userId)
                let c = { sessionUserId: `${req.session.userId}` }


                res.render("yen_trophy.ejs", {
                  json1,
                  json2,
                  json3,
                  json4,
                  json5,
                  json6,
                  json7,
                  c
                });
              });
            });
          });
        });
      });
    });
  });
});

// 個人資料路由

router.get("/profile", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  if (req.session.userId == undefined) {
    res.redirect("/login");
  } else {
    let apple = req.session.userId;
    let sqlone = `SELECT * FROM users where userId='${apple}'`;
    connection.query(sqlone, (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      let sqltwo = `SELECT * FROM userstats where userId='${apple}'`;
      connection.query(sqltwo, (err, result2) => {
        if (err) throw err;
        let a = result[0];
        let b = result2[0];
        let c = { sessionUserId: `${req.session.userId}` }
        console.log(c)
        // console.log(a)
        // console.log(b)
        var obj = Object.assign(a, b, c);
        if (obj.commentCount == null || obj.commentCount < 3) {
          obj.commentCount = 0;
        }
        console.log(obj);
        res.render("yen_profile.ejs", obj);

        // 要怎麼利用主檔名搜尋檔案
        // let filename = path.basename(result[0].userEmail)
        // let fileext = path.extname(result[0].userEmail)
        // console.log(filename)
        // console.log(fileext)
        // var fs = require('fs');

        // fs.readdir('public/img/yen/photo/', function (err, files) {
        //     console.log(files)
        //         .filter(function (file) { return file.substr(-5) === '.html'; })
        //         .forEach(function (file) { fs.readFile(file, 'utf-8', function (err, contents) { inspectFile(contents); }); });
        // });

        // function inspectFile(contents) {
        //     if (contents.indexOf('data-template="home"') != -1) {
        //         // do something
        //     }
        // }
        // let photopath = 'public/img/yen/photo/';
        // console.log(fs.readdir(photopath+result[0].userEmail, (err) => {
        //     console.log(err)
        // }))
        // fs.readFile(filename, (err) => {
        //     console.log(err)
        // })
      });
    });
  }
});

// 照片修改
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/yen/photo");
  },
  filename: function (req, file, cb) {
    let apple = req.session.userId;
    let sqlres = `SELECT userId FROM users where userId= '${apple}'`;
    connection.query(sqlres, (err, result, fields) => {
      if (err) throw err;
      let a = result[0].userId;
      // let b = a.userId
      // let name = file.originalname
      // let ext = name.split('.').pop()
      cb(null, a + ".png");
    });
  },
});
const upload = multer({ storage: storage });

router.post("/rephoto", upload.single("upload"), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  res.redirect("/profile");
});

// --修改個人資料
router.post("/rename", (req, res) => {
  let apple = req.session.userId;
  let name = req.body.name;
  let sql = `UPDATE users SET userName ='${name}' WHERE userId = '${apple}'`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
  res.redirect("/profile");
});
router.post("/rephone", (req, res) => {
  let apple = req.session.userId;
  let tel = req.body.tel;
  let sql = `UPDATE users SET userPhone ='${tel}' WHERE userId = '${apple}'`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
  res.redirect("/profile");
});
router.post("/remail", (req, res) => {
  let apple = req.session.userId;
  let email = req.body.mail;
  let sql = `UPDATE users SET userEmail ='${email}' WHERE userId = '${apple}'`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
  res.redirect("/profile");
});
router.post("/retext", (req, res) => {
  let apple = req.session.userId;
  let text = req.body.text;
  let sql = `UPDATE users SET userExp ='${text}' WHERE userId = '${apple}'`;
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
  res.redirect("/profile");
});

module.exports = router;
