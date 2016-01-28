function getNyTimesInfo(cityStr) {
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');

    // clear out old data before new request
    $nytElem.text("");

    //cityStr = 'Paris';
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' + cityStr + '&a&api-key=2dec600b8ccf67fccbc599f9a748e55e:2:73444575'

    //this anonymous function will get run as soon as we get an answer back the NYT
    $.getJSON(nytimesUrl, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];

            $nytElem.append('<li class="article">' +
                '<a href ="' + article.web_url + '">' + article.headline.main +
                '</a>' +
                '<p>' + article.snippet + '<p>' +
                '</li>');
        };
        //chaining the error => i.e. adding a method to another method
    }).error(function(e) {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded for ' + cityStr + '.');
    });
};