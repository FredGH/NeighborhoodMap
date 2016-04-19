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

    //Toggle the marker
    self.toggleBounce = function(index)
    {
        toggleBounce(markersModel[index].holdMarker);
    };

    return ko.utils.arrayFilter(markersModel, function(marker) {

        if (marker!== null) {
            if (marker.name.toLowerCase().indexOf(search) >= 0) {
                return marker.visible(true);

            } else {
                setAllMap();
                return marker.constructor(false);
            }
        }

    });
}, viewModel);

ko.applyBindings(viewModel);


