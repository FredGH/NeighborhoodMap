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

    return ko.utils.arrayFilter(markersModel, function(marker) {
        if (marker.name.toLowerCase().indexOf(search) >= 0) {
            return marker.visible(true);
        } else {
            setAllMap();
            return marker.visible(false);
        }


    });
}, viewModel);

ko.applyBindings(viewModel);


