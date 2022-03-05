// ---------------------- express---------------------- 
var express = require('express');
var song_tripManage_router = express.Router();

// ---------------------- body-parser ---------------------- 
var bodyParser = require('body-parser');
song_tripManage_router.use(bodyParser.json());
song_tripManage_router.use(bodyParser.urlencoded({ extended: false }));

// ---------------------- mysql ---------------------- 
var conn = require('../db.js')

// ---------------------- bluebird ---------------------- 
var bluebird = require('bluebird');
bluebird.promisifyAll(conn);



// ---------------------- request ---------------------- 


song_tripManage_router.post('/', function (req, res) {
    console.log(req.body);
    if (req.body.newTripName != undefined) {
        conn.query(`UPDATE trips SET tripName = '${req.body.newTripName}' WHERE tripId = ${req.body.tripId}`, function (err, rows) {
            res.redirect('/tripManage');
        })
    } else if (req.body.newTripNotes != undefined) {
        conn.query(`UPDATE trips SET tripDesc = '${req.body.newTripNotes}' WHERE tripId = ${req.body.tripId}`, function (err, rows) {
            res.redirect('/tripManage');
        })
    }

})


song_tripManage_router.get('/', function (req, res) {
    // if (req.session.userId == undefined) {
    //     res.redirect("/login");
    // } else {
        // var userId = req.session.userId;
        var userId = 5;

        var data = {
            userName: '',
            createTripList: [],
            joinTripList: [],
            //以下為trip詳細資料
            selectedTrip: {},
            tripchatboard: [
                {
                    userId: '',
                    chatTime: '',
                    chatMessage: ''
                },
            ],
            tripMember: [
            ],
            memberCount: null,
            sharedItems: [
            ],
            privateItems: [
            ],
            schedule: [
            ],
            tripNotes: ''
        };

        conn.queryAsync(`SELECT userName FROM users WHERE userId = ${userId}`)
            .then(result0 => {
                data.userName = result0[0].userName;
                var sql1 = `SELECT TM.positionState, T.tripId, T.tripName 
                        FROM tripmembers AS TM 
                        INNER JOIN trips AS T ON  TM.tripId=T.tripId 
                        WHERE TM.userId = ${userId} 
                        ORDER BY positionState DESC`;
                return conn.queryAsync(sql1);
            })
            .then(result1 => {
                console.log(result1)
                // function
                if (result1.length > 0) {
                    result1.forEach(item => {
                        if (item.positionState == 2) {
                            data.createTripList.push({ tripName: item.tripName, tripId: item.tripId });
                        }
                        else if (item.positionState == 1) {
                            data.joinTripList.push({ tripName: item.tripName, tripId: item.tripId });
                        }
                    })

                    var sql2 = '';
                    if (data.createTripList.length > 0) {
                        sql2 = `SELECT TM.tripId,TM.userId, TM.positionState, U.userName ,US.leadership, US.teamwork, US.strength, US.heal, US.survival, US.direction, US.commentCount, T.tripName
                        FROM tripmembers AS TM 
                        INNER JOIN users AS U ON TM.userId=U.userId 
                        INNER JOIN userstats AS US ON TM.userId=US.userId
                        INNER JOIN trips AS T ON TM.tripId=T.tripId
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
                    else {
                        return;
                    }

                    return conn.queryAsync(sql2);
                }
                else return ;
            })
            .then(result2 => {
                console.log(result2)
                if (result2 != undefined && result2.length > 0){
                        data.selectedTrip = { tripName: result2[0].tripName, tripId: result2[0].tripId };
                        result2.forEach(item => {
                            data.tripMember.push({
                                name: item.userName,
                                userId: item.userId,
                                positionState: item.positionState,
                                stat: {
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
                        var sql3 = `SELECT * FROM shareditems where tripId = ${result2[0].tripId} AND itemCount IS NOT NULL ORDER BY sharedItem`;
                        // var sql3 = `SELECT DISTINCT sharedItem FROM shareditems where tripId = ${result2[0].tripId} AND itemCount IS NOT NULL ORDER BY sharedItem`;
                        return conn.queryAsync(sql3);
                } 
                else return;
                
            })
            .then(result3 => {
                if(result3 != undefined){
                    if (result3.length > 0) {

                        for (let i = 0; i < result3.length; i++) {
                            if (i == 0 || result3[i].sharedItem != result3[i - 1].sharedItem) {
                                data.sharedItems.push({
                                    sharedItem: result3[i].sharedItem,
                                    itemCount: [{ userId: result3[i].userId, itemCount: result3[i].itemCount }]
                                })
                            }
                            else {
                                data.sharedItems[data.sharedItems.length - 1].itemCount.push(
                                    { userId: result3[i].userId, itemCount: result3[i].itemCount }
                                )
                            }
                        }
    
                    } else return;
    
                    var sql4 = `SELECT * FROM privateitems WHERE tripId = ${result3[0].tripId}`;
                    return conn.queryAsync(sql4);
                }
                else return;

            })
            .then(result4 => {
                if (result4.length > 0) {
                    result4.forEach(item => {
                        data.privateItems.push({ privateItem: item.privateItem, itemCount: item.itemCount })
                    });

                    var sql5 = `SELECT * FROM schedule WHERE tripId = ${result4[0].tripId} ORDER BY day ASC ,startTime ASC  `;
                    return conn.queryAsync(sql5);
                }
                else return res.render('song_tripManage.ejs', data);
            })
            .then(result5 => {
                if (result5.length > 0) {
                    for (let i = 0; i < result5.length; i++) {
                        if (i == 0 || result5[i].day != result5[i - 1].day) {
                            data.schedule.push({
                                day: result5[i].day,
                                activity: [{ startTime: result5[i].startTime.substring(0, result5[i].startTime.length - 3), activityName: result5[i].activity }]
                            })
                        }
                        else {
                            data.schedule[data.schedule.length - 1].activity.push(
                                { startTime: result5[i].startTime.substring(0, result5[i].startTime.length - 3), activityName: result5[i].activity }
                            )
                        }
                    }
                    var sql6 = `SELECT tripId, tripDesc FROM trips WHERE tripId = ${result5[0].tripId}`
                    return conn.queryAsync(sql6);
                }
                else return res.render('song_tripManage.ejs', data);
            })
            .then(result6 => {
                if (result6.length > 0) {
                    data.tripNotes = result6[0].tripDesc;
                    var sql7 = `SELECT tripId, COUNT(userId) AS memberCount FROM tripMembers WHERE tripId = ${result6[0].tripId} AND positionState > 0`;
                    return conn.queryAsync(sql7);
                }
                else return res.render('song_tripManage.ejs', data);
            })
            .then(result7 => {
                console.log(data);
                if (result7.length > 0) {
                    data.memberCount = result7[0].memberCount;
                    // console.log(data)
                    return res.render('song_tripManage.ejs', data);
                }
                else return res.render('song_tripManage.ejs', data);
            })
            .catch(err => console.log(err));
    // }
})


module.exports = song_tripManage_router;

