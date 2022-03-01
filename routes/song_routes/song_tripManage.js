var express = require('express');
var song_tripManage_router = express.Router();

var bodyParser = require('body-parser');
song_tripManage_router.use(bodyParser.json());
song_tripManage_router.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //if mac ,須設定為root
    database: "explorer",
    multipleStatements: true
});

song_tripManage_router.get('/', async function (req, res) {
    var userId = 1;

    conn.query(`SELECT tripId, positionState FROM tripmembers WHERE userId = ${userId} ORDER BY positionState DESC`, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(rows)

        res.render('song_tripManage.ejs', {
            userName: '',
            createTripNameList: [],
            joinTripNameList: [],
            //以下為trip詳細資料
            tripchatboard: [
                {
                    userId: '',
                    chatTime: '',
                    chatMessage: ''
                },
                {
                    userId: '',
                    chatTime: '',
                    chatMessage: ''
                }
            ],
            tripMember: {
                memberList: [
                    {
                        name: '',
                        userId: '',
                        sharedItem: [
                            { sharedItemName: '', itemCount: '' },
                            { sharedItemName: '', itemCount: '' }
                        ],
                        stat: [{
                            leadership: '', teamwork: '', strength: '',
                            heal: '', survival: '', direction: '',
                            commentCount: ''
                        }]
                    },
                ],
                applyList: [
                    {
                        name: '',
                        userId: '',
                        sharedItem: [
                            { sharedItemName: '', itemCount: '' },
                            { sharedItemName: '', itemCount: '' }
                        ],
                        stat: [{
                            leadership: '', teamwork: '', strength: '',
                            heal: '', survival: '', direction: '',
                            commentCount: ''
                        }]
                    },
                ]
            },
            sharedItems: [
                {
                    sharedItemName: '',
                    provideList: [
                        { userId: '', userName: '', itemCount: '' },
                    ]
                }
            ],
            privateItems: [
                { privateItemName: '', itemCount: '' },
            ],
            schedule: [
                {
                    day: '',
                    activity: [
                        { startTime: '', activityName: '' }
                    ]
                }
            ],
            tripNotes:''
        });
    });





})

song_tripManage_router.post('/', function (req, res) {
    console.log(req.body.tripName);
    res.send('Hello world!');

})

module.exports = song_tripManage_router;

