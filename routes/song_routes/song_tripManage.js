// 建立server
var express = require('express');
var song_tripManage_router = express.Router();

// body-parser
var bodyParser = require('body-parser');
song_tripManage_router.use(bodyParser.json());
song_tripManage_router.use(bodyParser.urlencoded({ extended: false }));

// 連到資料庫
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //if mac ,須設定為root
    database: "explorer",
    multipleStatements: true
});
conn.connect();

// bluebird
var bluebird = require('bluebird');
bluebird.promisifyAll(conn);


// -----------------------------------------------------------
// ------------------------  request -------------------------
// -----------------------------------------------------------
song_tripManage_router.get('/', async function (req, res) {
    var userId = 1;

    var data = {
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
        tripNotes: ''
    };

    

    conn.queryAsync(`SELECT tripId, positionState FROM tripmembers WHERE userId = ${userId} ORDER BY positionState DESC`).
    then(result1 => {
        console.log(result1)
    })
});


song_tripManage_router.post('/', function (req, res) {
    console.log(req.body.tripName);
    res.send('Hello world!');

})

module.exports = song_tripManage_router;

