var viewModel = {
    query: ko.observable(''),
};

viewModel.markersModel = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();

    //Open Url in new Window
    self.openInNewTab = function(data, event) {
        var win = window.open(data.url, '_blank');
        win.focus();
    };

    //Load articles
    self.loadArticles = function(marker) {
        getNyTimesInfo(marker);
        getWikkiInfo(marker);
    };

    //Populate infoWindow with clicked navigation item's address
    self.markerActions = function(marker) {

        //1.Toggle the marker
        self.toggleBounce(marker);

        //2.Display data in a window
        if (typeof(infowindow) !== 'undefined') {
            infowindow.close();
        }
        infowindow.setContent(marker.contentString);
        infowindow.open(map, marker.holdMarker);

        //3. Load the articles
        self.loadArticles(marker);
    };

    //Toggle the marker
    self.toggleBounce = function(marker) {
        toggleBounce(marker.holdMarker);
    };

    //Filter locations
    self.filter = function(marker)
    {
        //case 1: The user empty the search bar
        if (search === "") {
            return marker.visible(true);
        }
        //case 2: There is 'search' match, only show the items that matches the marker's name
        if (typeof(marker.holdMarker) !== 'undefined' && marker.name.toLowerCase().indexOf(search) >= 0 ) {
            return marker.holdMarker.visible = true;

        } else {
            //case 3: There is no match reset visibility to false
            return marker.visible(false);
        }
    };

    //Filter locations based on user input
    return ko.utils.arrayFilter(markersModel, function(marker) {
        return  self.filter(marker);
    });
}, viewModel);

ko.applyBindings(viewModel);


