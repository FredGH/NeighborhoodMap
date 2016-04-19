//local variables
var map;
var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

//Alert the user in case of an error when loading the google map (called by loadGoogleMap())
function googleErrorFunction() {
    alert('The google map could not be loaded...');
}

//load the map via the initialise() function
function loadGoogleMap() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=false&callback=initialise';
     //Async allows the script to be downloaded in the background without blocking.
     //Then, the moment it finishes downloading, rendering is blocked and that script executes.
     //Render resumes when the script has executed.
    script.async = "async"
     //Defer does the same thing, except claims to guarantee that scripts execute in the order they were specified on the page,
     //and that they will be executed after the document has finished parsing.
     // So, some scripts may finish downloading then sit and wait for scripts that downloaded later but appeared before them.
    script.defer = "defer"
    script.onerror = "googleErrorFunction()"
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
    /*if ($(window).width() < 850 || $(window).height() < 595) {
        hideNavigation();
    }*/

    map = new google.maps.Map(document.getElementById('googlemap-canvas'), mapOptions);

    setMarkers(markersModel);
    setAllMap();
}

//Set the markers visibility
function setAllMap() {
    for (var i = 0; i < markersModel.length; i++) {
        marker = markersModel[i];
        marker.holdMarker.setMap(map);
    }
}

//Get the street view image corresponding to marker lat/lng
function getStreetViewImage(index) {
    streetViewImage = streetViewUrl + markersModel[index].lat + ',' + markersModel[index].lng + '&fov=75&heading=' + headingImageView[index] + '&pitch=10';
}

//Bound the marker when the user click it for 2s, then stop bouncing
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);

        setTimeout(function () {
            marker.setAnimation(null);
        }, 2000);
    }
}

//Locates  markers on the map
//Sets infoWindows for each marker
function setMarkers(location) {

    infowindow = new google.maps.InfoWindow({
        content: ""
    });

    for (i = 0; i < location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
            position: new google.maps.LatLng(location[i].lat, location[i].lng),
            map: map,
            name: location[i].name
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

        //Click marker to view infoWindow and zoom if need be...
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
            return function() {

                toggleBounce(marker);

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
                viewModel.loadArticles(location[i]);

            };
        })(location[i].holdMarker, i));
    }
}




