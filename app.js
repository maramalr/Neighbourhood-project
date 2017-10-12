//initialize map
	var map;

	      // Create a new blank array for all the listing markers.
      var markers = [];

	function initMap()
	{

        var locations = [
          {title: 'Glowfit Gym', location: {lat: 24.6971, lng: 46.6868}},
          {title: 'Lusin Restaurant', location: {lat: 24.6980, lng: 46.6835}},
          {title: 'Sports Cafe', location: {lat: 24.6991, lng: 46.6893}},
          {title: 'Al Faisaliah Mall', location: {lat: 24.6895, lng: 46.6858}},
          {title: 'King Fahd National Library', location: {lat: 24.6856, lng: 46.6865}}
        ];

// constrcutrt creates a new map - only center and zoom are required 
map = new google.maps.Map(document.getElementById('map'),{

center: {lat: 24.6926139, lng: 46.6852937},
zoom: 14,
mapTypeControl: false
});

// adjust boundries on the map to fit want the user to see
        var largeInfowindow = new google.maps.InfoWindow();

        //loop through location to create one marker per location ..
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
           animation: google.maps.Animation.DROP,
            id: i
          });

        // Attach the marker to the place object
       // view.places()[i].marker = marker;
       
          // Push the marker to our array of markers.
          markers.push(marker);

          //to opern info windo if the each marker clicked 

                  // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
            //this refer to the marker 
 
         });
      }

            function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          //set the content of info windo to the title  then open it on that marker
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        };
      }
    }
viewModel = function(){
var pointer = this;

pointer.places = ko.observableArray([
 {title: 'Glowfit Gym'},
 {title: 'Lusin Restaurant'},
 {title: 'Sports Cafe'},
 {title: 'Al Faisaliah Mall'},
 {title: 'King Fahd National Library'}

  ]);

pointer.filter = ko.observable('');
pointer.filterList = ko.computed(function(){
  var filter = pointer.filter().toLowerCase();
  if (!filter){
    pointer.places().forEach(function(place){
if(place.marker){
place.marker.setVisible(true);
}
    });
    return pointer.places();
  }
  else {
return ko.utils.arraySearch(pointer.places(), function(place){
if(place.title.toLowerCase().indexOf(filter)>-1) {
  place.marker.setVisible(true);
  return true;
}
else {
  place.marker.setVisible(false);
  return false;
}
});
  }
  }, pointer);
pointer.listClick = function(location) {
  google.maps.event.trigger(location.marker, 'click');
};
};

var view = new viewModel();
ko.applyBindings(view);
