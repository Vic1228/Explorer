const express = require('express');
const session = require('express-session');
// const ejs = require('ejs')
const app = express();
const path = require('path');
const mysql = require('mysql');
app.set('view engine', 'ejs');
app.set('views', '/views');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: true
}))

// connect database/server
var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database:'test'
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
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/views/yen.html'))
    res.render('yen1.ejs');

});

app.post('/rename',(req,res)=>{
    // console.log('HI')
    let name = req.body.name;
    console.log(typeof name)
    let sql = `UPDATE users SET userName ='${name}' WHERE userID = 1`;
    conn.query(sql,(err, result, fields)=>{
        if(err)throw err
        console.log(result)
    });
    res.end()
})
app.post('/rephone',(req,res)=>{
    // console.log('HI')
    let tel = req.body.tel;
    console.log(typeof tel)
    let sql = `UPDATE users SET userPhone ='${tel}' WHERE userID = 1`;
    conn.query(sql,(err, result, fields)=>{
        if(err)throw err
        console.log(result)
    });
    res.end()
})
app.post('/remail',(req,res)=>{
    // console.log('HI')
    let email = req.body.email;
    console.log(typeof email)
    let sql = `UPDATE users SET userEmail ='${email}' WHERE userID = 1`;
    conn.query(sql,(err, result, fields)=>{
        if(err)throw err
        console.log(result)
    });
    res.end()
})





