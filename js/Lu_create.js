/*---------------------------------------------------------------*/
/*----------------------------- date ---------------------------*/
/*---------------------------------------------------------------*/

/*---------------------------------------------------------------*/
/*----------------------------- chart ---------------------------*/
/*---------------------------------------------------------------*/
const data = {
  labels: ["領導力", "醫術", "方向感", "團結", "體力", "求生力"],
  datasets: [
    {
      label: "王曉明",
      data: [6, 6, 7, 8, 5, 10],
      fill: true,
      backgroundColor: "rgb(100, 99, 132, 0.2)",
      borderColor: "rgb(100, 99, 132, 0.1)",
      pointBackgroundColor: "rgb(100, 99, 132, 0.5)",
      pointBorderColor: "rgb(100, 99, 132)",
      pointHoverBackgroundColor: "rgb(100, 99, 132)",
      pointHoverBorderColor: "rgb(100, 99, 132)",
      pointRadius: 3,
    },
  ],
};
const config = {
  type: "radar",
  data: data,
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        caretSize: 10,
        backgroundColor: "rgb(100, 99, 132)",
      },
    },
    elements: {
      line: {
        borderWidth: 1,
      },
    },
    scale: {
      beginAtZero: true,
      min: 1,
      max: 10,
      ticks: {
        stepSize: 1,
        font: {
          size: 0,
        },
      },
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 14,
          },
        },
        grid: {
          // 框線顏色
          color: "rgb(100, 99, 132, 0.4)",
        },
        ticks: {
          display: false,
        },
      },
    },
  },
};
const myChart = new Chart(document.getElementById("myChart"), config);

/*---------------------------------------------------------------*/
/*--------------------------- form-step -------------------------*/
/*---------------------------------------------------------------*/

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
  if (turn == 1 && !validForm()) return false;
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
  // const trArray = tabArray[currentTab].getElementsByTagName("tr");

  // 檢查input是不是沒有東西

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].value == "" || inputArray[i].value == undefined) {
      // 增加 invalid的樣式
      inputArray[i].className += " invalid";
      // trArray[i].className += " invalid";

      valid = false;
    }
  }
  return valid;
}

function submitBtnClick() {
  validForm();
  if (valid == true) document.createForm.submit();
}

function fixStepIndicator(currentStep) {
  // 刪除所有active燈號
  var step = document.getElementsByClassName("step");
  for (let i = 0; i < step.length; i++) {
    step[i].className = step[i].className.replace(" active", "");
  }
  // 目前步驟加上燈號
  step[currentStep].className += " active";
}
/*---------------------------------------------------------------*/
/*------------------------- table-control -----------------------*/
/*---------------------------------------------------------------*/

// 變數

//
const itineraryRow = `<tr>
                <td class="form-td">
                  <select name="schedules" id="" class="border-0 text-center h-100 form-input w-100"
                    oninput="this.className = 'border-0 text-center h-100 form-input w-100'">
                    <option value="" selected disabled>第?天</option>
                    <option value="1">第1天</option>
                    <option value="2">第2天</option>
                    <option value="3">第3天</option>
                    <option value="4">第4天</option>
                  </select>
                </td>
                <td class="form-td"><input name="schedules" type="time" id=""
                    class="text-center border-0 h-100 time-input form-input w-100"
                    oninput="this.className = 'text-center border-0 h-100 time-input form-input w-100'">
                </td>
                <td class="form-td"><input name="schedules" class="h-100 w-75 border-0 act-input text-center form-input"
                    type="text" class="border-0"
                    oninput="this.className = 'h-100 w-75 border-0 act-input text-center form-input'" placeholder="活動名稱"
                    style="margin-right: 1rem;">
                  <p onclick="addItineraryRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                    +</p>
                  <p onclick="deleteItineraryRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 1rem;">
                    x</p>
                </td>
              </tr>`;

const privateItem = `<tr>
                <td class="form-td"><input name="privateitems" type="text" class="text-center border-0 h-100 form-input"
                    placeholder="物品名稱" oninput="this.className = 'text-center border-0 h-100 form-input'"></td>
                <td class="form-td"><input name="privateitems" type="number"
                    class="text-center border-0 w-25 h-100 form-input"
                    oninput="this.className = 'text-center border-0 w-25 h-100 form-input'" style="margin-right: 1rem;">
                  <p onclick="addPrivateItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                    +</p>
                  <p onclick="deletePrivateItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 1rem;">
                    x</p>
                </td>
              </tr>`;
const sharedItem = `<tr>
                <td class="form-td"><input name="shareditems" type="text" class="text-center border-0 h-100 form-input"
                    placeholder="物品名稱" oninput="this.className = 'text-center border-0 h-100 form-input'"></td>
                <td class="form-td"><input name="shareditems" type="number" id=""
                    class="text-center border-0 h-100 form-input w-50"
                    oninput="this.className = 'text-center border-0 h-100 form-input w-50'" style="margin-right: 1rem;">
                  <p onclick="addSharedItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                    +</p>
                  <p onclick="deleteSharedItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 1rem;">
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
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.58044082121914, lng: 120.86312406425326 },
    zoom: 6.8,
  });

  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);
  // Location 1
  const request = {
    placeId: "ChIJraeA2rarQjQRPBBjyR3RxKw",
    fields: [
      "name",
      "formatted_address",
      "place_id",
      "geometry",
      "photo",
      "rating",
      "user_ratings_total",
    ],
  };
  service.getDetails(request, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      //   map.setCenter(place.geometry.location)
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
        infowindow.setContent(
          "<div class='infowindow-container'>" +
            "<img src='" +
            place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            "'></img>" +
            "<div class='inner'><h3>" +
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            "台北101</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button>參加</button>" +
            "</div></div>"
        );
      });
    }
  });

  const req2 = {
    placeId: "ChIJ_a1qN2SiaDQRZHNavQE-JnM",
    fields: [
      "name",
      "formatted_address",
      "place_id",
      "geometry",
      "photo",
      "rating",
      "user_ratings_total",
      "address_component",
    ],
  };
  service.getDetails(req2, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
        infowindow.setContent(
          "<div class='infowindow-container'>" +
            "<img src='" +
            place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            "'></img>" +
            "<div class='inner'><h3>" +
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            "翡翠谷</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button>參加</button>" +
            "</div></div>"
        );
      });
    }
  });

  const req3 = {
    placeId: "ChIJCQG9vQwFaTQRLe7JGdAOZVk",
    fields: [
      "name",
      "formatted_address",
      "place_id",
      "geometry",
      "photo",
      "rating",
      "user_ratings_total",
      "address_component",
    ],
  };
  service.getDetails(req3, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
        infowindow.setContent(
          "<div class='infowindow-container'>" +
            "<img src='" +
            place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            "'></img>" +
            "<div class='inner'><h3>" +
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            "火炎山</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<a href=`/marker/?${req3.placeId}`>隨便</a>" +
            "</div></div>"
        );
      });
    }
  });

  const req4 = {
    placeId: "ChIJ30vCQtzpZzQRY_ZjcfWOjDk",
    fields: [
      "name",
      "formatted_address",
      "place_id",
      "geometry",
      "photo",
      "rating",
      "user_ratings_total",
      "address_component",
    ],
  };
  service.getDetails(req4, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
        infowindow.setContent(
          "<div class='infowindow-container'>" +
            "<img src='" +
            place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            "'></img>" +
            "<div class='inner'><h3>" +
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            "玻璃海灘</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button>參加</button>" +
            "</div></div>"
        );
      });
    }
  });

  const req5 = {
    placeId: "ChIJB8psq07CZzQRLiwOajyFoQ8",
    fields: [
      "name",
      "formatted_address",
      "place_id",
      "geometry",
      "photo",
      "rating",
      "user_ratings_total",
      "address_component",
    ],
  };
  service.getDetails(req5, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
        infowindow.setContent(
          "<div class='infowindow-container'>" +
            "<img src='" +
            place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            " class='image''></img>" +
            "<div class='inner'><h3>" +
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            "烏岩角無人沙灘</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button>參加</button>" +
            "</div></div>"
        );
      });
    }
  });
}
