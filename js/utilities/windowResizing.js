//global variable that sets the navigation bar to visible
/*var isNavigationVisible = true;*/

//Hide/Show the navigation bar depending on defined thresholds
/*$(window).resize(function() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    if (windowWidth < 800 && isNavigationVisible) {hideNavigation();
    } else if (windowHeight < 500 && isNavigationVisible) {
        hideNavigation();
    }
    if (windowWidth >= 800 && !isNavigationVisible) {
        if ($(window).height() > 500) {
            showNavigation();
        }
    } else if (windowHeight >= 500 && !isNavigationVisible) {
        if (windowWidth > 800) {
            showNavigation();
        }
    }
});*/

//Shows the navigation bar
/*function showNavigation() {
    $("#search-nav").show();
    var scrollerHeight = $("#scroller").height() + 55;
    if ($(window).height() < 600) {
        $("#search-nav").animate({
            height: scrollerHeight - 100,
        }, 500, function() {
            $(this).css('height', 'auto').css("max-height", 439);
        });
    } else {
        $("#search-nav").animate({
            height: scrollerHeight,
        }, 500, function() {
            $(this).css('height', 'auto').css("max-height", 549);
        });
    }
    isNavigationVisible = true;
};*/

//Hide the navigation bar
/*function hideNavigation() {
    $("#search-nav").animate({
        height: 0,
    }, 500);
    setTimeout(function() {
        $("#search-nav").hide();
    }, 500);
    isNavigationVisible = false;
};*/