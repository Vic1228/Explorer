// function initMap() {
//   const localContextMapView = new google.maps.localContext.LocalContextMapView({
//     element: document.getElementById("map"),
//     placeTypePreferences: [
//     //   { type: "restaurant" },
//       { type: "tourist_attraction" },
//     ],
//     maxPlaceCount: 10,
//   });

//   map = localContextMapView.map;
//   map.setOptions({
//     center: { lat:24.203731252470472, lng:120.81240688811106},
//     zoom: 10,
//   });

//  // Markers Array
//   var markers = [
//     {lat:24.203731252470472, lng:120.81240688811106},
//     {lat:24.184152227988104, lng:120.60298122720086},
//   ];

//   // Loop through Markers
//   for(var i = 0;i < markers.length;i++){
//       addMarker(markers[i]);
//   }
  
//   // Add Marker Function
// function addMarker(e){
//     var marker = new google.maps.Marker({
//         position:e,
//         map,
//     });
//   }
// }



function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat:23.58044082121914, lng:120.86312406425326},
      zoom: 7.8
    });

    
    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    // Location 1
    const request = {
      placeId: 'ChIJraeA2rarQjQRPBBjyR3RxKw',
      fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total']
    };
    service.getDetails(request, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        //   map.setCenter(place.geometry.location)
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            infowindow.setContent("<div class='infowindow-container'>"+
            "<img src='" + place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +"'></img>"+
            "<div class='inner'><h3>" + 
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +'台北101</a>'+
            "</h3><p>評分: " + place.rating + "</p><p>總評論: " + place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:"+ place.formatted_address + "</p>" +"<button>參加</button>"+"</div></div>")
          });
        }
      });

      const req2={
        placeId: 'ChIJ_a1qN2SiaDQRZHNavQE-JnM',
        fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total','address_component']
      }
      service.getDetails(req2, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            infowindow.setContent("<div class='infowindow-container'>"+
            "<img src='" + place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +"'></img>"+
            "<div class='inner'><h3>" + 
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +'翡翠谷</a>'+
            "</h3><p>評分: " + place.rating + "</p><p>總評論: " + place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:"+ place.formatted_address + "</p>"+"<button>參加</button>"+"</div></div>")
          });
        }
      });

      const req3={
        placeId: 'ChIJCQG9vQwFaTQRLe7JGdAOZVk',
        fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total','address_component']
      }
      service.getDetails(req3, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            infowindow.setContent("<div class='infowindow-container'>"+
            "<img src='" + place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +"'></img>"+
            "<div class='inner'><h3>" + 
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +'火炎山</a>'+
            "</h3><p>評分: " + place.rating + "</p><p>總評論: " + place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:"+ place.formatted_address + "</p>"+"<a href=`/marker/?${req3.placeId}`>隨便</a>"+"</div></div>")
          });
        }
      });

      

      const req4={
        placeId: 'ChIJ30vCQtzpZzQRY_ZjcfWOjDk',
        fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total','address_component']
      }
      service.getDetails(req4, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            infowindow.setContent("<div class='infowindow-container'>"+
            "<img src='" + place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +"'></img>"+
            "<div class='inner'><h3>" + 
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +'玻璃海灘</a>'+
            "</h3><p>評分: " + place.rating + "</p><p>總評論: " + place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:"+ place.formatted_address + "</p>"+"<button>參加</button>"+"</div></div>")
          });
        }
      });
      
      const req5={
        placeId: 'ChIJB8psq07CZzQRLiwOajyFoQ8',
        fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo', 'rating', 'user_ratings_total','address_component']
      }
      service.getDetails(req5, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            infowindow.setContent("<div class='infowindow-container'>"+
            "<img src='" + place.photos[0].getUrl({ maxWidth: 200, maxHeight: 150 }) +" class='image''></img>"+
            "<div class='inner'><h3>" + 
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +'烏岩角無人沙灘</a>'+
            "</h3><p>評分: " + place.rating + "</p><p>總評論: " + place.user_ratings_total +
            "</p><p style='margin-left:15px'>地址:"+ place.formatted_address + "</p>" +"<button>參加</button>"+"</div></div>")
          });
        }
      });
      

}

