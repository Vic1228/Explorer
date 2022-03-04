function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.58044082121914, lng: 120.86312406425326 },
    zoom: 7.8,
  });

  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);
  // Location 1
  const req1 = {
    placeId: "ChIJH0OLXIhfaDQRe2M3VHul_nY",
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
  service.getDetails(req1, function (place, status) {
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
            '<a href="/spotId?id=1">' +
            "雪山</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            '<a href="/spotId?id=2">' +
            "翡翠谷</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem2()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            place.photos[1].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            "'></img>" +
            "<div class='inner'><h3>" +
            '<a href="/spotId?id=3">' +
            "火炎山</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem3()'> <a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            '<a href="/spotId?id=4">' +
            "玻璃海灘</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem4()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
      });
    }
  });

  const req5 = {
    placeId: "ChIJ8S89IWhLXTQRIwebUtrDH1w",
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
            '<a href="/spotId?id=5">' +
            "燭台沙灘</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem5()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
      });
    }
  });

  const req6 = {
    placeId: "ChIJUalgY62KbjQR6zGh_oOih1w",
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
  service.getDetails(req6, function (place, status) {
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
            '<a href="/spotId?id=6">' +
            "蝙蝠洞瀑布</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem6()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
      });
    }
  });

  const req7 = {
    placeId: "ChIJpb0epRKfbzQR2FJHsZNy3bw",
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
  service.getDetails(req7, function (place, status) {
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
            '<a href="/spotId?id=7">' +
            "金樽陸連島</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem7()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
      });
    }
  });

  const req8 = {
    placeId: "ChIJ745sjlAmbzQRgds_w0ah-lw",
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
  service.getDetails(req8, function (place, status) {
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
            place.photos[7].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            " class='image''></img>" +
            "<div class='inner'><h3>" +
            '<a href="/spotId?id=8">' +
            "雲龍瀑布</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem8()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
      });
    }
  });

  const req9 = {
    placeId: "ChIJU8R7M6w6bjQRMAjp0TYLshA",
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
  service.getDetails(req9, function (place, status) {
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
            place.photos[3].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            " class='image''></img>" +
            "<div class='inner'><h4>" +
            '<a href="/spotId?id=9">' +
            "北大武山步道</a>" +
            "</h4><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem9()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
      });
    }
  });

  const req10 = {
    placeId: "ChIJu2DussXBaDQRsbt2lWVVSv8",
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
  service.getDetails(req10, function (place, status) {
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
            place.photos[3].getUrl({ maxWidth: 200, maxHeight: 150 }) +
            " class='image''></img>" +
            "<div class='inner'><h3>" +
            '<a href="/spotId?id=10">' +
            "精英瀑布</a>" +
            "</h3><p>評分: " +
            place.rating +
            "</p><p>總評論: " +
            place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:" +
            place.formatted_address +
            "</p>" +
            "<button class='button' onclick='createItem10()'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
      });
    }
  });
  
}
const mapData = { lat:24.390898656065392, lng:121.29828430484407, spotId:1}; //雪山
const mapData2 = { lat:23.968570750696223, lng:121.495725354979, spotId:2}; //翡翠谷
const mapData3 = { lat:24.359824705766293, lng:120.73585039828758, spotId:3}; //火炎山
const mapData4 = { lat:24.581683139744996, lng:121.8723133531436, spotId:4}; //玻璃海攤
const mapData5 = { lat:25.23060285645177, lng:121.65120879436216, spotId:5}; //燭台沙灘
const mapData6 = { lat:23.184475657000405, lng:120.52350869813347, spotId:6}; //蝙蝠洞瀑布
const mapData7 = { lat:22.94977621264933, lng:121.28739508187, spotId:7}; //金樽陸連島
const mapData8 = { lat:23.555485102373016, lng:120.95261622109369, spotId:8}; //雲龍瀑布
const mapData9 = { lat:22.61466910437965, lng:120.70173283445003, spotId:9}; //北大武山步道
const mapData10 = { lat:24.034485309808005, lng:121.20286760192326, spotId:10}; //精英瀑布

24.390898656065392, 121.29828430484407
//點擊按鈕儲存資訊
function createItem() {
    localStorage.setItem("lat",JSON.stringify(mapData))
  };
  function createItem2() {
    localStorage.setItem("lat",JSON.stringify(mapData2))
  };
  function createItem3() {
    localStorage.setItem("lat",JSON.stringify(mapData3))
  };
  function createItem4() {
    localStorage.setItem("lat",JSON.stringify(mapData4))
  };
  function createItem5() {
    localStorage.setItem("lat",JSON.stringify(mapData5))
  };
  function createItem6() {
    localStorage.setItem("lat",JSON.stringify(mapData6))
  };
  function createItem7() {
    localStorage.setItem("lat",JSON.stringify(mapData7))
  };
  function createItem8() {
    localStorage.setItem("lat",JSON.stringify(mapData8))
  };
  function createItem9() {
    localStorage.setItem("lat",JSON.stringify(mapData9))
  };
  function createItem10() {
    localStorage.setItem("lat",JSON.stringify(mapData10))
  };


