### Project Aim

Develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit.
Add additional functionality to this application, including:
1. map markers to identify popular locations or places to visit
2. a search function to easily discover these locations
3. and a listview to support simple browsing of all locations.

Research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles,etc).

#### Access

1. View the site by directly accessing: rawgit.com/FredGH/NeighborhoodMap/master/index.html
2. Download the project and run it locally:
    - Go to https://github.com/FredGH/NeighborhoodMap
    - Find the 'download ZIP' button on the screen and click.
    - Once downloaded locally, please start index.html

#### Usage

1. Wait for the map to load, some places should be visible on the map (displayed with a marker)
2. Use the navigation bar to select a predefined place to view
3. Use the search to find a listed place
4. Click a maker, a box appears with a picture of the place and details about it
5. Whether you choose to click a marker on the map directly or to select an item in the navigation bar, the wikki and NY news boxes will refresh with the current news
(please note that all places are currently set to borough= Lewisham and city = London, therefore the boxes will refresh but with the same information content)

### List of bug fixes 20-April-2016

1. Layout modified to avoid overflow on small screen devices.
2. Clicking a location in the list view animates it's corresponding map marker and open an infowindow displaying location details.
3. Markers animates when they are clicked.
4. JQuery replaced by kockout MVVM in the entire project base.
5. Your AJAX requests are running and displaying data. The data is displayed in a separate web browser page
5. Use of defer and Async in function loadGoogleMap()
6. General refactoring and cleaning of the code

### List of bug fixes 28-April-2016
Correction of the following:
1 - modification of js/utilities/wikkipediaStream.js
   - wikkipedia articles are pointing to the borough instead of the city
   - Timeout function has been fixed
   - The article list is cleared out before adding new articles to a given location.
   - Error function has been renamed

2 - modification of index.html
   - loadArticles() now takes a parameter when called

3  - modification of js/utilities/googleMapGenerator.js
    - Error function has been renamed
    - Maker now bounce the first time when clicked
    - No marker is loaded on the map initially, when the user click an item in the list, then the item marker and info window appear. None of the others do.

4  - modification of js/models/markersModel.js
    - addition of some  unique location

5  - removal of js/utilities/windowResizing.js

6 -  All application components are usable across modern desktop, tablet, and phone browsers.
