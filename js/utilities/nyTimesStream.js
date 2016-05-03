function getNyTimesInfo(marker) {
    cityStr = marker.city;
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' + cityStr + '&a&api-key=2dec600b8ccf67fccbc599f9a748e55e:2:73444575'

    //this is a hack to workaround the tech limitation of lack of error handling
    //we start a timer that will stop 8000ms later
    var nyTimesRequestTimeOut = setTimeout(function() {
        var content = "Failed to get nyTimes  resources for " + cityStr + ".";
        ErrorNyTimes(content);
    }, 5000);

    //this anonymous function will get run as soon as we get an answer back the NYT
    $.getJSON(nytimesUrl, function(data) {

        articles = data.response.docs;
            nyTimesArrayModel.removeAll();
        for (var i = 0, len = articles.length; i < len; i++) {
            var article = articles[i];

            //push data url and content to the models
            var articleModel = {};
            articleStr = article.snippet;
            articleModel.id = "nyTimes" + i;
            articleModel.url = article.web_url;
            articleModel.content = articleStr;
            articleModel.visible = true;
            nyTimesArrayModel.push(articleModel);
        };

        //stop the timeout for happening....Else it would happen at all time,
        // even when the timeout is not passed
        clearTimeout(nyTimesRequestTimeOut);

        //chaining the error => i.e. adding a method to another method
    }).error(function(e) {
        var content = 'Ny Times Articles Could Not Be Loaded for ' + cityStr + '.' + 'Err Msg' + e.message;
        ErrorNyTimes(content,e);
    });

    nyTimesRequestTimeOut;
}

function ErrorNyTimes(content) {
    articleModel.id = "wikkepedia" + 0 ;
    articleModel.url = '';
    articleModel.content = content;
    articleModel.visible = true;
    nyTimesArrayModel.push(articleModel);
};