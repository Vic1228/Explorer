var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const session = require('express-session');
const multer = require('multer');
const fs = require('fs')

const { CLIENT_CONNECT_WITH_DB } = require("mysql/lib/protocol/constants/client");
// const myChart = new Chart();

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //if mac ,須設定為root
    database: "explorer",
    port: "3307",
});
connection.connect(function (error) {
    if (!!error) {
        console.log(error);
        console.log("連結資料庫失敗！");
    } else {
        console.log("仲硯已成功連結資料庫！");
    }
});



// 獎盃路由
router.get("/trophy", function (req, res) {
    let sql1 = 'SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by strength desc limit 10'
    let sql2 = 'SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by heal desc limit 10'
    let sql3 = 'SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by surriral desc limit 10'
    let sql4 = 'SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by direction desc limit 10'
    let sql5 = 'SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by leadership desc limit 10'
    let sql6 = 'SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by teamwork desc limit 10'
    let sql7 = 'SELECT * FROM userstats LEFT join users on users.userId = userstats.userId order by commentCount desc limit 20'
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
                                console.log(json7)
                                // var total = Object.assign(one,two);
                                // console.log('total>>>>' + total)
                                res.render("yen_trophy.ejs", { json1, json2, json3, json4, json5, json6, json7});
                            })
                        })
                    })
                })
            })
        })
    })
});

// 個人資料路由

router.get("/profile", (req, res) => {
    let sqlone = `SELECT * FROM users where userId=2`;
    connection.query(sqlone, (err, result, fields) => {
        if (err) throw err;
        sqltwo = `SELECT * FROM userstats where userId=1`
        connection.query(sqltwo, (err, result2) => {
            if (err) throw err;
            let b = result2[0];
            console.log(b);
            let a = result[0];
            console.log(a);
            var obj = Object.assign(a, b);
            // res.render("yen_profile.ejs", a,b);
            console.log(obj)
            res.render("yen_profile.ejs", obj);
        })
    });
});


// 照片修改
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/yen/photo')
    },
    filename: function (req, file, cb) {
        let sqlres = `SELECT userEmail FROM users where userId= 1`;
        connection.query(sqlres, (err, result, fields) => {
            if (err) throw err;
            let a = result[0];
            let b = a.userEmail
            let name = file.originalname
            let ext = name.split('.').pop()
            cb(null, b + '.' + ext)
        });
    }

})
const upload = multer({ storage: storage })

router.post('/rephoto', upload.single('upload'), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file)
    res.redirect('/profile')
});


// --修改個人資料
router.post("/rename", (req, res) => {
    let name = req.body.name;
    let sql = `UPDATE users SET userName ='${name}' WHERE userId = 1`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
    res.redirect("/profile");
});
router.post("/rephone", (req, res) => {
    let tel = req.body.tel;
    let sql = `UPDATE users SET userPhone ='${tel}' WHERE userId = 1`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
    res.redirect("/profile");
});
router.post("/remail", (req, res) => {
    let email = req.body.mail;
    let sql = `UPDATE users SET userEmail ='${email}' WHERE userId = 1`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
    res.redirect("/profile");
});
router.post("/retext", (req, res) => {
    let text = req.body.text;
    let sql = `UPDATE users SET userExp ='${text}' WHERE userId = 1`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
    res.redirect("/profile");
});

module.exports = router;