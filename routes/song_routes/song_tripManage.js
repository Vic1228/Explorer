// ---------------------- express----------------------
const express = require("express");
const song_tripManage_router = express.Router();

// ---------------------- body-parser ----------------------
const bodyParser = require("body-parser");
song_tripManage_router.use(bodyParser.json());
song_tripManage_router.use(bodyParser.urlencoded({ extended: false }));

// ---------------------- mysql ----------------------
const conn = require("../db.js");

// ---------------------- bluebird ----------------------
const bluebird = require("bluebird");
bluebird.promisifyAll(conn);


// ---------------------- multer ----------------------
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/song_upload');
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
});


// ---------------------- request ---------------------
song_tripManage_router.put("/", function (req, res) {
  switch (req.body.action) {
    case 'tripNameEdit':
      conn.query(`UPDATE trips SET tripName = '${req.body.changes}' WHERE tripId = ${req.body.tripId}`, function (err, rows) {
        if (err) throw err;
        res.send({ state: 'success' });
      })
      break;
    case 'tripNoteEdit':
      conn.query(`UPDATE trips SET tripDesc = '${req.body.changes}' WHERE tripId = ${req.body.tripId}`, function (err, rows) {
        if (err) throw err;
        res.send({ state: 'success' });
      })
      break;
    case 'memberApplyConfirm':
      conn.query(`UPDATE tripmembers SET positionState = 1 WHERE tripId = ${req.body.tripId} AND userId = ${req.body.currentMemberId}`, function (err, rows) {
        if (err) throw err;
        res.send({ state: 'success' });
      })
      break;
    case 'memberApplyReject':
      conn.query(`DELETE FROM tripmembers WHERE userId = ${req.body.currentMemberId}`, function (err, rows) {
        if (err) throw err;
        conn.query(`DELETE FROM shareditems WHERE userId = ${req.body.currentMemberId} AND tripId = ${req.body.tripId}`, function (err, rows) {
          res.send({ state: 'success' });
        })
      })
      break;
    case 'statComment':
      conn.query(`UPDATE userstats SET leadership = ${req.body.stat.leadership},
                                       teamwork   = ${req.body.stat.leadership},
                                       strength   = ${req.body.stat.strength},
                                       heal       = ${req.body.stat.heal},
                                       survival   = ${req.body.stat.survival},
                                       direction  = ${req.body.stat.direction},
                                       commentCount  = ${req.body.stat.commentCount}
                  WHERE userId = ${req.body.currentMemberId}`,
        function (err, rows) {
          if (err) throw err;
          res.send({ state: 'success' });
        })
      break;
    case 'publicItemProvide':
      var newProvider = req.body.newProvider;
      var provideVal = req.body.provideVal;
      if (newProvider === true && provideVal != 0) {
        conn.query(`INSERT INTO shareditems (tripId, userId, sharedItem, itemCount) 
                    VALUES (${req.body.tripId},${req.body.userId},'${req.body.sharedItem}',${req.body.provideVal})`,
          function (err, rows) {
            res.send({ state: 'Insert success' });
          })
      } else if (newProvider === false && provideVal != 0) {
        conn.query(`UPDATE shareditems SET itemCount = ${req.body.itemCount} 
                    WHERE tripId = ${req.body.tripId} AND userId = ${req.body.userId} AND sharedItem = '${req.body.sharedItem}'`,
          function (err, rows) {
            res.send({ state: 'Update success' });
          })
      } else if (newProvider === false && provideVal === 0) {
        conn.query(`DELETE FROM shareditems WHERE tripId = ${req.body.tripId} AND userId = ${req.body.userId} AND sharedItem = '${req.body.sharedItem}'`,
          function (err, rows) {
            res.send({ state: 'Delete success' });
          })
      } else {
        res.send({ Hello: 'world!' })
      }
      break;
  }
})

song_tripManage_router.delete("/quit", function (req, res) {
  conn.query(`DELETE FROM tripmembers WHERE userId = ${req.body.userId} AND tripId = ${req.body.tripId}`, function (err, rows) {
    if (err) throw err;
    conn.query(`DELETE FROM shareditems WHERE userId = ${req.body.userId} AND tripId = ${req.body.tripId}`, function (err, rows) {
      if (err) throw err;
      res.end();
    })
  })
});

song_tripManage_router.post('/upload', upload.single('image'), function (req, res, next) {
  let sql = `INSERT INTO spotcomments (tripId, userId, tripMessageTime, tripMessageText,	tripImgName) VALUES (${req.body.tripId}, ${req.body.userId}, '${req.body.tripMessageTime}', NULL, '${req.file.filename}')`;
  conn.query(sql, function () {
    return res.send('Image uploaded!');
  })
})

song_tripManage_router.post('/uploadText', function (req, res) {
  let sql = `INSERT INTO spotcomments (tripId, userId, tripMessageTime, tripMessageText,	tripImgName) VALUES (${req.body.tripId}, ${req.body.userId}, '${req.body.tripMessageTime}', '${req.body.text}', NULL)`;
  conn.query(sql, function () {
    return res.send('text uploaded!');
  })
})

song_tripManage_router.post('/getChat', function (req, res) {
  let sql = `SELECT * FROM spotcomments WHERE tripId = ${req.body.tripId} ORDER BY tripMessageTime`;
  let chatdata = { tripChatBoard: [] };
  conn.query(sql, function (err, rows) {
    if (rows != undefined) {
      rows.forEach((elm1) => {
        req.body.tripMember.forEach((elm2) => {
          if (elm1.userId == elm2.userId) {
            chatdata.tripChatBoard.push({
              userId: elm1.userId,
              userName: elm2.name,
              tripMessageTime: elm1.tripMessageTime,
              tripMessageText: elm1.tripMessageText,
              tripImgName: elm1.tripImgName
            })
          }
        })
      })
    }
    res.send({chatdata: chatdata})

  })
})


song_tripManage_router.get("/", function (req, res) {
  if (req.session.userId == undefined) {
    res.redirect("/login");
  }
  var userId = req.session.userId;
  // var userId = 6;

  var data = {
    sessionUserId: userId,
    userName: "",
    createTripList: [],
    joinTripList: [],
    //以下為trip詳細資料
    selectedTrip: {},
    tripChatBoard: [

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
        if (req.query.selectedTripId != undefined) {
          data.selectedTrip = {
            tripId: Number(req.query.selectedTripId),
            tripName: req.query.selectedTripName
          }
        } else if (data.createTripList.length > 0) {
          data.selectedTrip = {
            tripId: data.createTripList[0].tripId,
            tripName: data.createTripList[0].tripName
          }
        } else if (data.joinTripList.length > 0) {
          data.selectedTrip = {
            tripId: data.joinTripList[0].tripId,
            tripName: data.joinTripList[0].tripName
          }
        }
        var sql2 = `SELECT TM.tripId,TM.userId, TM.positionState, U.userName ,US.leadership, US.teamwork, US.strength, US.heal, US.survival, US.direction, US.commentCount, T.tripName
        FROM tripmembers AS TM 
        INNER JOIN users AS U ON TM.userId=U.userId 
        INNER JOIN userstats AS US ON TM.userId=US.userId
        INNER JOIN trips AS T ON TM.tripId=T.tripId
        WHERE TM.tripId=${data.selectedTrip.tripId}
        ORDER BY TM.positionState DESC`;
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
              leadership: Math.floor(item.leadership * 10) / 10,
              teamwork: Math.floor(item.teamwork * 10) / 10,
              strength: Math.floor(item.strength * 10) / 10,
              heal: Math.floor(item.heal * 10) / 10,
              survival: Math.floor(item.survival * 10) / 10,
              direction: Math.floor(item.direction * 10) / 10,
              commentCount: Math.floor(item.commentCount * 10) / 10,
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
        var sql6 = `SELECT DATE_FORMAT(tripStartDate,  "%Y/%m/%d") AS tripStartDate , DATE_FORMAT(tripEndDate, "%Y/%m/%d") AS tripEndDate , tripId, tripDesc, spotId FROM trips WHERE tripId = ${data.selectedTrip.tripId}`;
        return conn.queryAsync(sql6);
      }
      else return;
    })
    .then((result6) => {  // 1. 指派 data.注意事項 , spotId, tripStartDate, tripEndDate。      2. 查詢 selTrip 之團員人數。若無selTrip，return。
      if (result6 != undefined) {
        data.tripNotes = result6[0].tripDesc;
        data.selectedTrip.spotId = result6[0].spotId;
        data.selectedTrip.tripStartDate = result6[0].tripStartDate;
        data.selectedTrip.tripEndDate = result6[0].tripEndDate;
        var sql7 = `SELECT tripId, COUNT(userId) AS memberCount FROM tripMembers WHERE tripId = ${data.selectedTrip.tripId} AND positionState > 0`;
        return conn.queryAsync(sql7);
      }
      else return;
    })
    .then((result7) => {  // 1. 指派 data.團員人數。      2. 查詢 selTrip 之目的地。若無selTrip，return。
      if (result7 != undefined) {
        data.memberCount = result7[0].memberCount;
        var sql8 = `SELECT spotName FROM spots WHERE spotId = ${data.selectedTrip.spotId}`
        return conn.queryAsync(sql8);
      }
      else return;
    })
    .then((result8) => {
      if (result8 != undefined) { // 1.指派 spotName。     2. 查詢 selTrip 之留言板。若無selTrip，return。
        data.selectedTrip.spotName = result8[0].spotName;
        var sql9 = `SELECT * FROM spotcomments WHERE tripId = ${data.selectedTrip.tripId} ORDER BY tripMessageTime`;
        return conn.queryAsync(sql9);
      }
      else return;
    })
    .then((result9) => {
      if (result9 != undefined) {
        result9.forEach((elm1) => {
          data.tripMember.forEach((elm2) => {
            if (elm1.userId == elm2.userId) {
              data.tripChatBoard.push({
                userId: elm1.userId,
                userName: elm2.name,
                tripMessageTime: elm1.tripMessageTime,
                tripMessageText: elm1.tripMessageText,
                tripImgName: elm1.tripImgName
              })
            }
          })
        })
      }
      console.log(data)
      return res.render("song_tripManage.ejs", { data: JSON.stringify(data) });
    })
    .catch((err) => console.log(err));
});




module.exports = song_tripManage_router;
