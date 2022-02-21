//npm i express axios
const express = require("express");
const app = express();
const axios = require("axios")
// 

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.json())

//參考連結
//https://developers.google.com/maps/documentation/places/web-service/details#Geometry
 
//以axios抓api資料
 async function Hello(){
  await axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ6Sql71hxaDQRH_2A8h3A1es&fields=name%2Cformatted_address&key=AIzaSyB4PHXQoO2OW5vP-LkI53o2YGu_tqiOB8I',)
  .then(function (response) {
     result = response.data
    })
  .catch(function (error) {
    console.log(error);
  })
  console.log(result);
 }
 async function Hello(){
  await axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ_a1qN2SiaDQRZHNavQE-JnM&fields=name%2Cformatted_address&key=AIzaSyB4PHXQoO2OW5vP-LkI53o2YGu_tqiOB8I',)
  .then(function (response) {
     result = response.data
    })
  .catch(function (error) {
    console.log(error);
  })
  console.log(result);
 }
//呼叫function,取得json資料
Hello();

  // async function getUser() {
  //   try {
  //     await axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=place_id%2Cformatted_phone_number&key=AIzaSyB4PHXQoO2OW5vP-LkI53o2YGu_tqiOB8I');
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // getUser()

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});