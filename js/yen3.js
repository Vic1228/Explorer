const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: true
}))
app.set('view engine', 'ejs');
app.set('views', '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3307'
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

// function queryDatabase() {
//     conn.query('DROP TABLE IF EXISTS inventory;', function (err, results, fields) {
//         if (err) throw err;
//         console.log('Dropped inventory table if existed.');
//     })
//     conn.query('CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);',
//         function (err, results, fields) {
//             if (err) throw err;
//             console.log('Created inventory table.');
//         })
//     conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['banana', 150],
//         function (err, results, fields) {
//             if (err) throw err;
//             else console.log('Inserted ' + results.affectedRows + ' row(s).');
//         })
//     conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['orange', 154],
//         function (err, results, fields) {
//             if (err) throw err;
//             console.log('Inserted ' + results.affectedRows + ' row(s).');
//         })
//     conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['apple', 100],
//         function (err, results, fields) {
//             if (err) throw err;
//             console.log('Inserted ' + results.affectedRows + ' row(s).');
//         })
//     conn.end(function (err) {
//         if (err) throw err;
//         else console.log('Done.')
//     });
// };



// routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index2.html'))
});




