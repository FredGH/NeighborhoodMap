function getWikkiInfo(marker) {

    boroughStr = marker.borough;
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
        cityStr + '&format=json&callback=wikiCallbkack';

    //this is a hack to workaround the tech limitation of lack of error handling
    //we start a timer that will stop 8000ms later
    var wikiRequestTimeOut = setTimeout(function() {
        var content = "Failed to get wikipedia resources for " + boroughStr + ".";
        Error(content,e);
    }, 9000);

    $.ajax(wikiUrl, {
        dataType: "jsonp", //has not got the concept of error handling=>tech limitation
        success: function(response) {
            var articleList = response[1];
            for (var i = 0, len =  articleList.length;  i < len  ; i++) {
                articleStr = articleList[i];

                //push data url and content to the models
                articleModel.id = "wikkepedia" + i;
                articleModel.url = 'http://en.wikipedia.org/wiki/' + articleStr;
                articleModel.content = articleStr;
                articleModel.visible = true;
                wikkipediaArrayModel.push(articleModel);
            };

            //stop the timeout for happening....Else it would happen at all time,
            // even when the timeout is not passed
            clearTimeout(wikiRequestTimeOut);
        }
    }).error(function(e) {
        var content = 'Wikkipedia Articles Could Not Be Loaded for ' + cityStr + '.' + 'Err Msg' + e.message;
       Error(content,e);
    });
}

function Error(content) {
    articleModel.id = "wikkepedia" + 0 ;
    articleModel.url = '';
    articleModel.content = content;
    articleModel.visible = true;
    wikkipediaArrayModel.push(articleModel);
};


//ko.applyBindings( new getWikkiInfo(viewModel.markersModel.borough));