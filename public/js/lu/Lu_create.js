/*---------------------------------------------------------------*/
/*--------------------------- form-step -------------------------*/
/*---------------------------------------------------------------*/

// spotId預處理

let spot = JSON.parse(localStorage.getItem('lat')).spotId;
document.getElementById("spotid").value = spot;


// 變數
let currentTab = 0;
showTab(currentTab);

// 畫面到頂端
$("html,body").scrollTop(0);
// 方法
function showTab(nowPage) {
  // id是唯一的 classname可以重複 所以才能變成陣列
  const tabArray = document.getElementsByClassName("tab");
  // 陣列[目前步驟]display: block;
  tabArray[nowPage].style.display = "block";
  // 0 => prevBtn 不顯示  1,2,3 => 顯示
  if (nowPage == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    // 1,2,3 => prevBtn 以inline顯示
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (nowPage == tabArray.length - 1) {
    // 3 => nextBtn-none submitBtn-block
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submitBtn").innerHTML = "提交";
    document.getElementById("submitBtn").style.display = "inline";
  } else {
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("nextBtn").innerHTML = "下一步";
    document.getElementById("nextBtn").style.display = "inline";
  }
  // 執行步驟燈方法(目前步驟)
  fixStepIndicator(nowPage);
}
// 換頁 0/1
function nextPrev(turn) {
  const tabArray = document.getElementsByClassName("tab");
  // TODO: 沒輸入資訊無法下一頁
  // if (turn == 1 && !validForm()) return false;
  // 當前步驟隱藏
  tabArray[currentTab].style.display = "none";
  // 目前頁面變數更新
  currentTab += turn;
  // 畫面到頂端
  $("html,body").scrollTop(0);
  // 執行目前步驟方法
  showTab(currentTab);
}
var valid;

// 是否有效
function validForm() {
  // TODO: 設定變數
  valid = true;
  const tabArray = document.getElementsByClassName("tab");
  const inputArray = tabArray[currentTab].getElementsByClassName("form-input");


  // 檢查input是不是沒有東西

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].value == "" || inputArray[i].value == undefined) {
      // 增加 invalid的樣式
      inputArray[i].className += " invalid";
    

      valid = false;
    }
  }
  return valid;
}

function submitBtnClick() {
  // validForm();
  // if (valid == true) {
    // TODO:
  
  // }
  document.createForm.submit();
  
  // let spot = JSON.parse(localStorage.getItem("lat")).spotId;
  // $.post('/response', {
  //   trip: $().target.val(),
  //   spot: $().target.val(),
  //   schedule: $().target.val(),
  //   private: $().target.val(),
  //   shared: $().target.val(),
  // })
}

function fixStepIndicator(currentStep) {
  // 刪除所有active燈號
  var step = document.getElementsByClassName("step");
  var stepText = document.getElementsByClassName("step-text")
  for (let i = 0; i < step.length; i++) {
    step[i].className = step[i].className.replace(" active", "");
    stepText[i].className = stepText[i].className.replace(" active", "");
  }
  // 目前步驟加上燈號
  step[currentStep].className += " active";
  stepText[currentStep].className += " active";
}
/*---------------------------------------------------------------*/
/*------------------------- table-control -----------------------*/
/*---------------------------------------------------------------*/

// 變數
const itineraryRow = `<tr>
                <td class="form-td">
                  <select name="schedule" id="" class="border-0 text-center h-100 form-input w-100"
                    oninput="this.className = 'border-0 text-center h-100 form-input w-100'" style="font-size:1.4rem;">
                    <option value="" selected disabled>第__天</option>
                    <option value="1">第1天</option>
                    <option value="2">第2天</option>
                    <option value="3">第3天</option>
                    <option value="4">第4天</option>
                  </select>
                </td>
                <td class="form-td"><input name="schedule" type="time" id=""
                    class="text-center border-0 h-100 time-input form-input w-100"
                    oninput="this.className = 'text-center border-0 h-100 time-input form-input w-100'" style="font-size:1.4rem;">
                </td>
                <td class="form-td"><input name="schedule" class="h-100 w-50 border-0 act-input text-center form-input"
                    type="text" oninput="this.className = 'h-100 w-50 border-0 act-input text-center form-input'"
                    placeholder="活動名稱" style="margin-right: 1rem; font-size: 1.4rem; position: relative; left: 2.8rem;">
                  <p onclick="addItineraryRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="position: relative; left: 4rem; background-color: #006c9b;">
                    +</p>
                  <p onclick="deleteItineraryRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 0.5rem; position: relative; left: 4rem; background-color: #006c9b;">
                    x</p>
                </td>
              </tr>`;

const privateItem = `<tr>
                <td class="form-td"><input name="private" type="text" class="border-0 text-center h-100 form-input"
                    placeholder="裝備名稱" oninput="this.className = 'border-0 text-center h-100 form-input'" style="font-size: 1.4rem;"></td>
                <td class="form-td">
                  <input name="private" type="number" class="border-0 text-center w-25 h-100 form-input"
                    oninput="this.className = 'border-0 text-center w-25 h-100 form-input'"
                    style="position: relative; left: 2.7rem; font-size: 1.4rem;" placeholder="0">
                  <p onclick="addPrivateItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="position: relative; left: 3.7rem; background-color: #006c9b;">
                    +</p>
                  <p onclick="deletePrivateItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 0.5rem; position: relative; left: 3.7rem; background-color: #006c9b;">
                    x</p>
                </td>
              </tr>`;
const sharedItem = `<tr>
                <td class="form-td"><input name="shared" type="text" class="text-center border-0 h-100 form-input"
                    placeholder="裝備名稱" oninput="this.className = 'text-center border-0 h-100 form-input'" style="font-size: 1.4rem;"></td>
                <td class="form-td"><input name="shared" type="number"
                    class="text-center border-0 h-100 form-input w-25"
                    oninput="this.className = 'text-center border-0 h-100 form-input w-25'"
                    style="margin-right: 1rem; position: relative; left: 3.2rem; font-size: 1.4rem;" placeholder="0">
                  <p onclick="addSharedItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="position: relative; left: 3.5rem; background-color: #006c9b;">
                    +</p>
                  <p onclick="deleteSharedItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 0.5rem; position: relative; left: 3.5rem; background-color: #006c9b;">
                    x</p>
                </td>
              </tr>`;

// 方法

// 增加列
function addItineraryRow(p) {
  // $("#ItineraryTable>tbody").append(itineraryRow);
  $(p).closest("tr").after(itineraryRow);
}
function addPrivateItemRow(p) {
  $(p).closest("tr").after(privateItem);
}
function addSharedItemRow(p) {
  $(p).closest("tr").after(sharedItem);
}

// 刪除列
// <p onclick="deleteItineraryRow(this)" 第165行
function deleteItineraryRow(p) {
  $(p).closest("tr").remove();
}
function deletePrivateItemRow(p) {
  $(p).closest("tr").remove();
}
function deleteSharedItemRow(p) {
  $(p).closest("tr").remove();
}

/*---------------------------------------------------------------*/
/*----------------------------- 地圖 ----------------------------*/
/*---------------------------------------------------------------*/

function initMap() {

  const location = (JSON.parse(localStorage.getItem('lat'))); // 從localStorage取得經緯度的值
  console.log( (JSON.parse(localStorage.getItem('lat'))).spotId); // 瀏覽器呈現出spotId
  map = new google.maps.Map(document.getElementById("map"), {
    center: location, //{ lat: 23.58044082121914, lng: 120.86312406425326 }, // The map, centered at location
    zoom: 10
  });
  // The marker, positioned at location
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });

  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  // Location 1
  const request = {
    placeId: 'ChIJQwsNxDdgaDQRzDQVzlSrgIE',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'rating', 'user_ratings_total']
  };
  service.getDetails(request, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
    //   map.setCenter(place.geometry.location)
    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map
    });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "雪山</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });

  const req2 = {
    placeId: 'ChIJ_a1qN2SiaDQRZHNavQE-JnM',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req2, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "翡翠谷</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });

  const req3 = {
    placeId: 'ChIJCQG9vQwFaTQRLe7JGdAOZVk',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req3, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "火炎山</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });


  const req4 = {
    placeId: 'ChIJ30vCQtzpZzQRY_ZjcfWOjDk',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req4, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "玻璃海灘</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });

  const req5 = {
    placeId: 'ChIJ8S89IWhLXTQRIwebUtrDH1w',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req5, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "燭台沙灘</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });

  const req6 = {
    placeId: 'ChIJUalgY62KbjQR6zGh_oOih1w',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req6, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "蝙蝠洞瀑布</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });

  const req7 = {
    placeId: 'ChIJpb0epRKfbzQR2FJHsZNy3bw',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req7, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:5rem'>" + "金樽陸連島</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });

  const req8 = {
    placeId: 'ChIJ745sjlAmbzQRgds_w0ah-lw',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req8, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "雲龍瀑布</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });

  const req9 = {
    placeId: 'ChIJU8R7M6w6bjQRMAjp0TYLshA',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req9, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "北大武山步道</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });

  const req10 = {
    placeId: 'ChIJu2DussXBaDQRsbt2lWVVSv8',
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total', 'address_component']
  }
  service.getDetails(req10, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent("<div class='infowindow-container'>" +
          "<div class='inner'><h5>" +
          "<span style='margin-left:7rem'>" + "精英瀑布</span>" +
          "</p><p style='margin-left:0.5rem'>地址:" + place.formatted_address + "</p>" + "</div></div>")
      });
    }
  });
}

