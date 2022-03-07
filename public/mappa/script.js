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
    placeId: "ChIJ0aYLQg4hbzQRfg2EIaUay4M",
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
            "玉山</a>" +
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
    placeId: "ChIJwbqRiNgkbzQRlL8HhKymoT0",
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
            "馬博拉斯山</a>" +
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
    placeId: "ChIJDSGtGr8kbzQRAJad9ethhZw",
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
            "秀姑巒山</a>" +
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
    placeId: "ChIJ_QArHsZiaDQRxEAnX0PnwQc",
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
            "南湖大山</a>" +
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
    placeId: "ChIJv2YdtvcJbzQR6NJ-AtqRcXE",
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
            "關山</a>" +
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
    placeId: "ChIJjyoIB2mUaDQRFibYsKd5Les",
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
            "奇萊山</a>" +
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
    placeId: "ChIJ782u6b6SaDQRtD-8c-mgPys",
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
            "合歡山</a>" +
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
    placeId: "ChIJ3ZYGz95gaDQR08CvUzFwS1c",
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
            "桃山</a>" +
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
    placeId: "ChIJ-by_9ZxgaDQRl3Z4QSUjeQU",
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
            "品田山</a>" +
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
const mapData = { lat: 24.390898656065392, lng: 121.29828430484407, spotId: 1 }; //雪山
const mapData2 = { lat: 23.47062919259415, lng: 120.95754078838556, spotId: 2 }; //玉山
const mapData3 = {
  lat: 23.523021338969716,
  lng: 121.06433788893624,
  spotId: 3,
}; //馬博拉斯山
const mapData4 = {
  lat: 23.501737312030443,
  lng: 121.06011578839541,
  spotId: 4,
}; //秀姑巒山
const mapData5 = { lat: 24.36154834568155, lng: 121.43400489656634, spotId: 5 }; //南湖大山
const mapData6 = {
  lat: 23.053576532492254,
  lng: 121.16468774454114,
  spotId: 6,
}; //關山
const mapData7 = {
  lat: 24.086616211283214,
  lng: 121.32290163515005,
  spotId: 7,
}; //奇萊山
const mapData8 = {
  lat: 24.1821713408634,
  lng: 121.28121729655567,
  spotId: 8,
}; //合歡山
const mapData9 = { lat: 24.43388623086648, lng: 121.30534059610521, spotId: 9 }; //桃山
const mapData10 = {
  lat: 24.42883077088577,
  lng: 121.26698965801161,
  spotId: 10,
}; //品田山

//點擊按鈕儲存資訊
function createItem() {
  // localStorage.setItem("lat", JSON.stringify(mapData1));
  location.href = '/createTrip?id=1&x=24.390898656065392&y=121.29828430484407';
}
function createItem2() {
  localStorage.setItem("lat", JSON.stringify(mapData2));
}
function createItem3() {
  localStorage.setItem("lat", JSON.stringify(mapData3));
}
function createItem4() {
  localStorage.setItem("lat", JSON.stringify(mapData4));
}
function createItem5() {
  localStorage.setItem("lat", JSON.stringify(mapData5));
}
function createItem6() {
  localStorage.setItem("lat", JSON.stringify(mapData6));
}
function createItem7() {
  localStorage.setItem("lat", JSON.stringify(mapData7));
}
function createItem8() {
  localStorage.setItem("lat", JSON.stringify(mapData8));
}
function createItem9() {
  localStorage.setItem("lat", JSON.stringify(mapData9));
}
function createItem10() {
  localStorage.setItem("lat", JSON.stringify(mapData10));
}
