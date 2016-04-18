var viewModel = {
    query: ko.observable(''),

};

viewModel.markersModel = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();

    self.loadArticles = function ()
    {
        loadArticles(infowindow.location);
    };

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


