// ---------------------- express---------------------- 
var express = require('express');
var song_tripManage_router = express.Router();

// ---------------------- body-parser ---------------------- 
var bodyParser = require('body-parser');
song_tripManage_router.use(bodyParser.json());
song_tripManage_router.use(bodyParser.urlencoded({ extended: false }));

// ---------------------- mysql ---------------------- 
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //if mac ,須設定為root
    database: "explorer",
    multipleStatements: true
});

// ---------------------- bluebird ---------------------- 
var bluebird = require('bluebird');
bluebird.promisifyAll(conn);



// ---------------------- request ---------------------- 
song_tripManage_router.get('/', function (req, res) {
    var userId = 1;
    var data = {
        userName: '',
        createTripList: [],
        joinTripList: [],
        //以下為trip詳細資料
        tripchatboard: [
            {
                userId: '',
                chatTime: '',
                chatMessage: ''
            },
        ],
        tripMember: [
        ],
        sharedItems: [
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

    var sql1 = `SELECT TM.positionState, T.tripId, T.tripName 
                FROM tripmembers AS TM 
                INNER JOIN trips AS T ON  TM.tripId=T.tripId 
                WHERE TM.userId = ${userId} 
                ORDER BY positionState DESC`;
    conn.queryAsync(sql1)
        .then(result1 => {
            // function
            result1.forEach(item => {
                if (item.positionState == 2) {
                    data.createTripList.push({ tripName: item.tripName, tripId: item.tripId });
                }
                else if (item.positionState == 1) {
                    data.joinTripList.push({ tripName: item.tripName, tripId: item.tripId });
                }
            })

            console.log(data.createTripList);
            console.log(data.joinTripList)

            var sql2 = '';
            if (data.createTripList.length > 0) {
                sql2 = `SELECT TM.tripId,TM.userId, TM.positionState, U.userName ,US.leadership, US.teamwork, US.strength, US.heal, US.survival, US.direction, US.commentCount
                        FROM tripmembers AS TM 
                        INNER JOIN users AS U ON TM.userId=U.userId 
                        INNER JOIN userstats AS US ON TM.userId=US.userId
                        WHERE TM.tripId=${data.createTripList[0].tripId}
                        ORDER BY TM.positionState DESC`;
            }
            else if (data.joinTripList.length > 0) {
                sql2 = `SELECT TM.tripId,TM.userId, TM.positionState, U.userName ,US.leadership, US.teamwork, US.strength, US.heal, US.survival, US.direction, US.commentCount
                        FROM tripmembers AS TM 
                        INNER JOIN users AS U ON TM.userId=U.userId 
                        INNER JOIN userstats AS US ON TM.userId=US.userId
                        WHERE TM.tripId=${data.joinTripList[0].tripId}
                        ORDER BY TM.positionState DESC`;
            }
            else{
                return;
            }

            return conn.queryAsync(sql2);
        })
        .then(result2 => {
            // console.log(apple);
            result2.forEach( item =>{
                data.tripMember.push({
                    name: item.userName,
                    userId: item.userId,
                    positionState: item.positionState,
                    stat:{
                        leadership: item.leadership,
                        teamwork: item.teamwork,
                        strength: item.strength,
                        heal: item.heal,
                        survival: item.survival,
                        direction: item.direction,
                        commentCount: item.commentCount
                    },
                });
            })

            if(result2.length == 0){
                return;
            }

            var sql3 = `SELECT * FROM shareditems where tripId = ${result2[0].tripId} AND itemCount IS NOT NULL ORDER BY sharedItem`
            return conn.queryAsync(sql3);

        })
        .then(result3 => {
            console.log(result3);
            result3.forEach(item => {
                data.sharedItems.push({
                    
                })
            })
            return res.render('song_tripManage.ejs');
        })
        .catch(err => console.log(err));

})

song_tripManage_router.post('/', function (req, res) {
    console.log(req.body.tripName);
    res.send('Hello world!');

})

module.exports = song_tripManage_router;

