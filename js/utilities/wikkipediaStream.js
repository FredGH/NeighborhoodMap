function getWikkiInfo(cityStr) {

    var $wikiElem = $('#wikipedia-links');
    // clear out old data before new request
    $wikiElem.text("");

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
        cityStr + '&format=json&callback=wikiCallbkack';

    //this is a hack to workaround the tech limitation of lack of error handling
    //we start a timer that will stop 8000ms later
    var wikiRequestTimeOut = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources for " + cityStr + ".");
    }, 9000);

    $.ajax(wikiUrl, {
        dataType: "jsonp", //has notgot the concept of error handling=>tech limitation
        success: function(response) {
            var articleList = response[1];
            for (var i = 0, len =  articleList.length;  i < len  ; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            //stop the timeout for happening....Else it would happen at all time,
            // even when the timeout is notpassed
            clearTimeout(wikiRequestTimeOut);
        }
    });
}

ko.applyBindings( new getWikkiInfo(viewModel.markersModel.borough));