var express = require('express');
var song_tripManage_router = express.Router();

var bodyParser = require('body-parser');
song_tripManage_router.use( bodyParser.json() );
song_tripManage_router.use( bodyParser.urlencoded({extended: false}) );

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //if mac ,須設定為root
    database: "explorer",
  });

song_tripManage_router.get('/', function(req,res){
    var userId = 1;
    var apple;
    conn.query(`SELECT tripId FROM tripmembers WHERE userId = ${userId} ORDER BY positionState`,function(err,rows){
        apple = rows;
        console.log(apple[0]);
        res.render('song_tripManage.ejs',);
    });
})

song_tripManage_router.post('/',function(req,res){
    console.log(req.body.tripName);
    res.send('Hello world!')
    
})

module.exports = song_tripManage_router;