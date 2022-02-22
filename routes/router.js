var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",  //if mac ,須設定為root
    database: "explorer",
  });


router.get('/',function(req,res){
    res.render('vic_homepage.ejs')
})

router.get('/spotInfo',function(req,res){
    res.render('vic_spotInfo.ejs')
})

router.get('/map',function(req,res){
    res.render('hong_map.ejs')
})

router.get('/login',function(req,res){
    res.render('hong_login.ejs')
})

router.get('/trips',function(req,res){
    res.render('han_trips.ejs')
})

router.get('/tripInfo',function(req,res){
    res.render('han_tripInfo.ejs')
})

//仲硯開始
router.get('/trophy',function(req,res){
    res.render('yen_trophy.ejs')
})
router.get('/profile',(req,res)=>{
    let sqlres = `SELECT * FROM users where userID=1`;
    connection.query(sqlres, (err, result, fields) => {
        if (err) throw err;
        let a = result[0]
        console.log(a)
        res.render('yen_profile.ejs',a)
    });
})

router.post('/rename', (req, res) => {
    let name = req.body.name;
    let sql = `UPDATE users SET userName ='${name}' WHERE userID = 1`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result)
    });
    res.redirect('/profile')
})
router.post('/rephone', (req, res) => {
    let tel = req.body.tel;
    let sql = `UPDATE users SET userPhone ='${tel}' WHERE userID = 1`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err
        console.log(result)
    });
    res.redirect('/profile')
})
router.post('/remail', (req, res) => {
    let email = req.body.mail;
    let sql = `UPDATE users SET userEmail ='${email}' WHERE userID = 1`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err
        console.log(result)
    });
    res.redirect('/profile')
})
router.post('/retext', (req, res) => {
    let text = req.body.text;
    let sql = `UPDATE users SET userExprnience ='${text}' WHERE userID = 1`;
    connection.query(sql, (err, result, fields) => {
        if (err) throw err
        console.log(result)
    });
    res.redirect('/profile')
})

// 仲硯結束

// 呂學奇 
router.get('/createTrip',function(req,res){
    res.render('lu_createTrip.ejs')
})


router.get('/tripManage',function(req,res){
    res.render('song_tripManage.ejs')
})

module.exports = router;