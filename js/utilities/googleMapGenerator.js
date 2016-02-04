//local variables
var map;
var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

//load the map via the initialise() function
function loadGoogleMap() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=false&callback=initialise';
    document.body.appendChild(script);
}

window.onload = loadGoogleMap;

//Initialise the map and its contents
function initialise() {

    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(51.454930, 0.007821)
    };

    if ($(window).width() <= 1080) {
        mapOptions.zoom = 13;
    }
    if ($(window).width() < 850 || $(window).height() < 595) {
        hideNavigation();
    }

    map = new google.maps.Map(document.getElementById('googlemap-canvas'), mapOptions);

    setMarkers(markersModel);
    setAllMap();
}

//Set the markers visibility
function setAllMap() {
    for (var i = 0; i < markersModel.length; i++) {
        var marker = markersModel[i];
        marker.holdMarker.setMap(map);
    }
}

//Get the street view image corresponding to marker lat/lng
function getStreetViewImage(index) {
    streetViewImage = streetViewUrl + markersModel[index].lat + ',' + markersModel[index].lng + '&fov=75&heading=' + headingImageView[index] + '&pitch=10';
}

//Locates  markers on the map
//Sets infoWindows for each marker
function setMarkers(location) {
    for (i = 0; i < location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
            position: new google.maps.LatLng(location[i].lat, location[i].lng),
            map: map,
            name: location[i].name,
            icon: {
                url: 'img/marker.png',
                size: new google.maps.Size(25, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(12.5, 40)
            },
            shape: {
                coords: [1, 25, -40, -25, 1],
                type: 'poly'
            }
        });

        //Set google street view images within info windows
        getStreetViewImage(i);

        //Binds infoWindow content to each marker
        location[i].contentString = '<img src="' + streetViewImage +
            '" alt="Street View Image of ' + location[i].name + '"><br><hr style="margin-bottom: 5px"><strong>' +
            location[i].name + '</strong><br><p>' +
            location[i].firstLineOfAddress + '<br>' + location[i].postCode + '<br>' +
            location[i].city + '<br></p><a class="web-links" href="http://' + location[i].url +
            '" target="_blank">' + location[i].url + '</a>';

        var infowindow = new google.maps.InfoWindow({
            content: markersModel[i].contentString
        });

        //Click marker to view infoWindow and zoom if need be...
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(location[i].contentString);
                infowindow.open(map, this);
                var windowWidth = $(window).width();
                if (windowWidth <= 1080) {
                    map.setZoom(14);
                } else if (windowWidth > 1080) {
                    map.setZoom(16);
                }
                map.setCenter(marker.getPosition());

                //get the info from the different ajax calls
                getArticlesInformation(location[i]);

            };
        })(location[i].holdMarker, i));

        //Populate infoWindow with clicked navigation item's address
        var searchNav = $('#nav' + i);
        searchNav.click((function(marker, i) {
            return function() {
                infowindow.setContent(location[i].contentString);
                infowindow.open(map, marker);
                map.setZoom(16);
                map.setCenter(marker.getPosition());

                //get the info from the different ajax calls
                getArticlesInformation(location[i]);

            };
        })(location[i].holdMarker, i));
    }
}

//Wrapper function that contains all the ajax call to get articles on the map
function getArticlesInformation(location) {
    //get the info from the different ajax calls
    //getNyTimesInfo(location.city);
    //getWikkiInfo(location.borough);

    //viewModel.markersModel.city.subscribe(function(newValue) {getNyTimesInfo(newValue)});
    //viewModel.markersModel.borough.subscribe(function(newValue) {getWikkiInfo(newValue)});
}


