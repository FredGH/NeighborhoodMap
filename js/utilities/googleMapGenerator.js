//local variables
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
    document.body.appendChild(script);
}

window.onload = loadGoogleMap;

//Initialise the map and its contents
function initialise() {
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(51.454930, 0.007821)
    };

    //make these variables global...
    map = new google.maps.Map(document.getElementById('googlemap-canvas'), mapOptions);
    infowindow = new google.maps.InfoWindow({
        content: ""
    });

    setMarkers(markersModel);
}

//Get the street view image corresponding to marker lat/lng
function getStreetViewImage(index) {
    streetViewImage = streetViewUrl + markersModel[index].lat + ',' + markersModel[index].lng + '&fov=75&heading=' + headingImageView[index] + '&pitch=10';
}

//Bound the marker when the user click it for 2s, then stop bouncing
function toggleBounce(marker) {

    marker.setAnimation(google.maps.Animation.BOUNCE);

    //stop animation after 2s
    setTimeout(function () {
        marker.setAnimation(null);
    }, 2000);
}

//Locates  markers on the map
//Sets infoWindows for each marker
function setMarkers(mm) {
    for (i = 0; i < mm.length; i++) {
        mm[i].holdMarker = new google.maps.Marker({
            position: new google.maps.LatLng(mm[i].lat, mm[i].lng),
            map: map,
            name: mm[i].name,
        });

        //no marker is shown on init
        mm[i].holdMarker.setVisible(false);
        //mm[i].holdMarker.holdMarker.setVisible(false);

        //Set google street view images within info windows
        getStreetViewImage(i);

        //Binds infoWindow content to each marker
        mm[i].contentString = '<img src="' + streetViewImage +
        '" alt="Street View Image of ' + mm[i].name + '"><br><hr style="margin-bottom: 5px"><strong>' +
            mm[i].name + '</strong><br><p>' +
            mm[i].firstLineOfAddress + '<br>' + mm[i].postCode + '<br>' +
            mm[i].city + '<br></p><a class="web-links" href="http://' + mm[i].url +
        '" target="_blank">' + mm[i].url + '</a>';

        //reset the markersModel
        markersModel = mm;

        //Click marker to view corresponding infoWindow...
        new google.maps.event.addListener(markersModel[i].holdMarker, 'click', (function(marker, i) {
            return function() {
                viewModel.markerActions(markersModel[i]);
            };
        })(markersModel[i].holdMarker, i));

    }
}