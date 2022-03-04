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
            "</p>" +
            "<p><button class='button'> <a class='join' href='/trips'>參加行程</a></button>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
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
            "</p>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            "</p>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            "</p>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            "</p>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            "</p>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            "</p>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            "<p><button class='button'>參加行程</button>" +
            "<button class='button'>建立行程</button></p>" +
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
            "</p>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            "</p>" +
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
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
            "<button class='button'><a class='join' href='/createTrip'>發起行程</a></button></p>" +
            "</div></div>"
        );
      });
    }
  });
}
