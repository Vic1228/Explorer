const { __express } = require('ejs');
const express = require('express');
const session = require('express-session');
const app = express();
const axios = require('axios')
// const ejs = require('ejs')
// const path = require('path');
const mysql = require('mysql');
// view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// static files
app.use(express.static(__dirname));
app.use(express.static("image"));
app.use(express.static("public"));
app.use(express.static("js"));
app.use(express.static("nav"));
app.use(express.static("footer"));
app.use(express.static("css"));
app.use(express.static("style"));
app.use(express.static("MAP_Hong"));
// router
var router = require('./routes/router.js');
app.use('/',router);

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: '12345678',
        resave: false,
        saveUninitialized: true
    }))

// connect database/server
var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3307',
    database: 'test'
});
conn.connect((err) => {
    if (err) {
        throw err
    }
    console.log('database is connecting')
});

app.listen(3000, () => {
    console.log('server is running');
})


// routing

app.get('/map', (req, res) => {
    res.sendFile(__dirname+'/MAP_Hong/map.ejs')
    // res.render('map2')
});

app.get('/cup', (req, res) => {
    let sqlres = `SELECT * FROM users where userID=1`;
    conn.query(sqlres, (err, result, fields) => {
        if (err) throw err;
        let a = result[0]
        // console.log(a)
        res.render('yen_trophy.ejs', a);
    });
});



app.post('/rename', (req, res) => {
    let name = req.body.name;
    let sql = `UPDATE users SET userName ='${name}' WHERE userID = 1`;
    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result)
    });
    res.redirect('/cup')
})
app.post('/rephone', (req, res) => {
    let tel = req.body.tel;
    let sql = `UPDATE users SET userPhone ='${tel}' WHERE userID = 1`;
    conn.query(sql, (err, result, fields) => {
        if (err) throw err
        console.log(result)
    });
    res.redirect('/cup')
})
app.post('/remail', (req, res) => {
    let email = req.body.mail;
    let sql = `UPDATE users SET userEmail ='${email}' WHERE userID = 1`;
    conn.query(sql, (err, result, fields) => {
        if (err) throw err
        console.log(result)
    });
    res.redirect('/cup')
})
app.post('/retext', (req, res) => {
    let text = req.body.text;
    let sql = `UPDATE users SET userExprnience ='${text}' WHERE userID = 1`;
    conn.query(sql, (err, result, fields) => {
        if (err) throw err
        console.log(result)
    });
    res.redirect('/cup')
})





