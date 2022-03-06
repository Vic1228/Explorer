// ---------------------- express----------------------
var express = require("express");
var song_tripManage_router = express.Router();

// ---------------------- body-parser ----------------------
var bodyParser = require("body-parser");
song_tripManage_router.use(bodyParser.json());
song_tripManage_router.use(bodyParser.urlencoded({ extended: false }));

// ---------------------- mysql ----------------------
var conn = require("../db.js");

// ---------------------- bluebird ----------------------
var bluebird = require("bluebird");
bluebird.promisifyAll(conn);

// ---------------------- request ----------------------

song_tripManage_router.post("/", function (req, res) {
  console.log(req.body);
  if (req.body.newTripName != undefined) {
    conn.query(
      `UPDATE trips SET tripName = '${req.body.newTripName}' WHERE tripId = ${req.body.tripId}`,
      function (err, rows) {
        res.redirect("/tripManage");
      }
    );
  } else if (req.body.newTripNotes != undefined) {
    conn.query(
      `UPDATE trips SET tripDesc = '${req.body.newTripNotes}' WHERE tripId = ${req.body.tripId}`,
      function (err, rows) {
        res.redirect("/tripManage");
      }
    );
  }
});

song_tripManage_router.get("/", function (req, res) {
  // if (req.session.userId == undefined) {
  //   res.redirect("/login");
  // }
  // var userId = req.session.userId;
  var userId = 6

  var data = {
    sessionUserId: req.session.userId,
    userName: "",
    createTripList: [],
    joinTripList: [],
    //以下為trip詳細資料
    selectedTrip: {},
    tripchatboard: [
      {
        userId: "",
        chatTime: "",
        chatMessage: "",
      },
    ],
    tripMember: [],
    memberCount: null,
    sharedItems: [],
    privateItems: [],
    schedule: [],
    tripNotes: "",
  };

  conn.queryAsync(`SELECT userName FROM users WHERE userId = ${userId}`)
    .then((result0) => {  // 1. 指派 data.userName。     2. 查詢user create/join 的trip，若無，return空陣列。
      data.userName = result0[0].userName;
      var sql1 = `SELECT TM.positionState, T.tripId, T.tripName 
                        FROM tripmembers AS TM 
                        INNER JOIN trips AS T ON  TM.tripId=T.tripId 
                        WHERE TM.userId = ${userId}
                        ORDER BY positionState DESC`;
      return conn.queryAsync(sql1);
    })
    .then((result1) => {  // 1. 指派 data.create/joinTripList，並指定selected trip。  2. 查詢 selTrip 之 tripMember。若無selTrip，return。
      if (result1.length > 0) {
        result1.forEach((item) => {
          if (item.positionState == 2) {
            data.createTripList.push({
              tripName: item.tripName,
              tripId: item.tripId,
            });
          } else if (item.positionState == 1) {
            data.joinTripList.push({
              tripName: item.tripName,
              tripId: item.tripId,
            });
          }
        });

        var sql2 = "";
        if (data.createTripList.length > 0) {
          data.selectedTrip = {
            tripId: data.createTripList[0].tripId,
            tripName: data.createTripList[0].tripName
          }
          sql2 = `SELECT TM.tripId,TM.userId, TM.positionState, U.userName ,US.leadership, US.teamwork, US.strength, US.heal, US.survival, US.direction, US.commentCount, T.tripName
                        FROM tripmembers AS TM 
                        INNER JOIN users AS U ON TM.userId=U.userId 
                        INNER JOIN userstats AS US ON TM.userId=US.userId
                        INNER JOIN trips AS T ON TM.tripId=T.tripId
                        WHERE TM.tripId=${data.selectedTrip.tripId}
                        ORDER BY TM.positionState DESC`;
        }
        else if (data.joinTripList.length > 0) {
          data.selectedTrip = {
            tripId: data.joinTripList[0].tripId,
            tripName: data.joinTripList[0].tripName
          }
          sql2 = `SELECT TM.tripId,TM.userId, TM.positionState, U.userName ,US.leadership, US.teamwork, US.strength, US.heal, US.survival, US.direction, US.commentCount
                        FROM tripmembers AS TM 
                        INNER JOIN users AS U ON TM.userId=U.userId 
                        INNER JOIN userstats AS US ON TM.userId=US.userId
                        WHERE TM.tripId=${data.selectedTrip.tripId}
                        ORDER BY TM.positionState DESC`;
        }
        return conn.queryAsync(sql2);
      }
      else return;
    })
    .then((result2) => {  // 1. 指派 data.tripMember。   2. 查詢 selTrip 之公共裝備。若無selTrip，return。
      if (result2 != undefined) {
        result2.forEach((item) => {
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
              commentCount: item.commentCount,
            },
          });
        });
        var sql3 = `SELECT * FROM shareditems where tripId = ${data.selectedTrip.tripId} AND itemCount IS NOT NULL ORDER BY sharedItem`;
        // var sql3 = `SELECT DISTINCT sharedItem FROM shareditems where tripId = ${result2[0].tripId} AND itemCount IS NOT NULL ORDER BY sharedItem`;
        return conn.queryAsync(sql3);
      }
      else return;
    })
    .then((result3) => {  // 1. 指派 data.公共裝備。      2. 查詢 selTrip 之私人裝備。若無selTrip，return。
      if (result3 != undefined) {
        for (let i = 0; i < result3.length; i++) {
          if (i == 0 || result3[i].sharedItem != result3[i - 1].sharedItem) {
            data.sharedItems.push({
              sharedItem: result3[i].sharedItem,
              itemCount: [
                { userId: result3[i].userId, itemCount: result3[i].itemCount },
              ],
            });
          } else {
            data.sharedItems[data.sharedItems.length - 1].itemCount.push({
              userId: result3[i].userId,
              itemCount: result3[i].itemCount,
            });
          }
        }
        var sql4 = `SELECT * FROM privateitems WHERE tripId = ${data.selectedTrip.tripId}`;
        return conn.queryAsync(sql4);
      }
      else return;
    })
    .then((result4) => {  // 1. 指派 data.私人裝備。      2. 查詢 selTrip 之行程詳情。若無selTrip，return。
      if (result4 != undefined) {
        result4.forEach((item) => {
          data.privateItems.push({
            privateItem: item.privateItem,
            itemCount: item.itemCount,
          });
        });

        var sql5 = `SELECT * FROM schedule WHERE tripId = ${data.selectedTrip.tripId} ORDER BY day ASC ,startTime ASC  `;
        return conn.queryAsync(sql5);
      }
      else return;
    })
    .then((result5) => {  // 1. 指派 data.行程詳情。      2. 查詢 selTrip 之注意事項。若無selTrip，return。
      if (result5 != undefined) {
        for (let i = 0; i < result5.length; i++) {
          if (i == 0 || result5[i].day != result5[i - 1].day) {
            data.schedule.push({
              day: result5[i].day,
              activity: [
                {
                  startTime: result5[i].startTime.substring(
                    0,
                    result5[i].startTime.length - 3
                  ),
                  activityName: result5[i].activity,
                },
              ],
            });
          } else {
            data.schedule[data.schedule.length - 1].activity.push({
              startTime: result5[i].startTime.substring(
                0,
                result5[i].startTime.length - 3
              ),
              activityName: result5[i].activity,
            });
          }
        }
        var sql6 = `SELECT tripId, tripDesc FROM trips WHERE tripId = ${data.selectedTrip.tripId}`;
        return conn.queryAsync(sql6);
      } 
      else return;
    })
    .then((result6) => {  // 1. 指派 data.注意事項。      2. 查詢 selTrip 之團員人數。若無selTrip，return。
      if (result6 != undefined) {
        data.tripNotes = result6[0].tripDesc;
        var sql7 = `SELECT tripId, COUNT(userId) AS memberCount FROM tripMembers WHERE tripId = ${data.selectedTrip.tripId} AND positionState > 0`;
        return conn.queryAsync(sql7);
      } 
      else return;
    })
    .then((result7) => {  // 1. 指派 data.團員人數。      2. 查詢 selTrip 之團員人數。若無selTrip，return。
      if (result7 != undefined) {
        data.memberCount = result7[0].memberCount;
      } 
      return res.render("song_tripManage.ejs", data);
    })
    .catch((err) => console.log(err));
});

module.exports = song_tripManage_router;
