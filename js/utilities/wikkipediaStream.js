function getWikkiInfo(marker) {
    boroughStr = marker.borough;
    var boroughUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
        boroughStr + '&format=json&callback=wikiCallbkack';

    $.ajax(boroughUrl, {
        dataType: "jsonp", //has not got the concept of error handling=>tech limitation
        timeout:  5000,
        success: function(response) {
            var articleList = response[1];
            wikkipediaArrayModel.removeAll();
            for (var i = 0, len =  articleList.length;  i < len  ; i++) {
                var articleStr = articleList[i];

                //push data url and content to the models
                var articleModel = {};
                articleStr = articleList[i];
                articleModel.id = "wikkepedia" + i;
                articleModel.url = 'http://en.wikipedia.org/wiki/' + articleStr;
                articleModel.content = articleStr;
                articleModel.visible = true;
                wikkipediaArrayModel.push(articleModel);

            };
        }
    }).error(function(e) {
        var content = 'Wikkipedia Articles could not be loaded for ' + boroughStr + '.' + 'Err Msg' + e.message;
        ErroWikki(content,e);
    });
}

function ErroWikki(content) {
    articleModel.id = "wikkepedia" + 0 ;
    articleModel.url = '';
    articleModel.content = content;
    articleModel.visible = true;
    wikkipediaArrayModel.push(articleModel);
};