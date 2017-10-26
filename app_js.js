$("#nav-bar").click('click', function(e) {
  $("#option-box-id").toggleClass('open');
  e.stopPropagation();
});

//initialize map
var map;

 var locations = [{
      title: 'Glowfit Gym',
      location: {
        lat: 24.6971,
        lng: 46.6868
      }
    },
    {
      title: 'Lusin Restaurant',
      location: {
        lat: 24.6980,
        lng: 46.6835
      }
    },
    {
      title: 'Sports Cafe',
      location: {
        lat: 24.6991,
        lng: 46.6893
      }
    },
    {
      title: 'Al Faisaliah Mall',
      location: {
        lat: 24.6895,
        lng: 46.6858
      }
    },
    {
      title: 'King Fahd National Library',
      location: {
        lat: 24.6856,
        lng: 46.6865
      }
    }
  ];

// Create a new blank array for all the listing markers.
var markers = [];

function initMap() {

  // constrcutrt creates a new map - only center and zoom are required 
  map = new google.maps.Map(document.getElementById('map'), {

    center: {
      lat: 24.6926139,
      lng: 46.6852937
    },
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
    view.places()[i].marker = marker;

    // Push the marker to our array of markers.
    markers.push(marker);

    //to opern info windo if the each marker clicked 

    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {

      foursquareApi(this, largeInfowindow)
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
      infowindow.addListener('closeclick', function() {
        infowindow.setMarker = null;
      });
    };
  }
}

//calling foursquare API
  function foursquareApi(marker, infoWindow){

        var CLIENT_ID = "V4SM1D2MGA1LM44XFVOA023CGPDLUEFFNBXDE3G4VYXQQXJN";
        var CLIENT_SECRET = "RDZEGYVSPPXGJRKMMBC1PNW1NJ1MDOUB40GOJMBJL0JZKEKW";
      //  var LatLng = "4.6926139,46.6852937";
        // var LL = "4.6926139,46.6852937";
        // var LL="40.7243,-74.0018";
        console.log(marker.position.lng())
        var LL = marker.position.lat().toString() + ',' + marker.position.lng().toString()
        console.log(LL)

        var version = "20172210";
        var query = 'restaurants'
        var URL = "https://api.foursquare.com/v2/venues/search?" +
                  "ll=" + LL + "&query=" + query + "&client_id=" +
                  CLIENT_ID + "&client_secret=" + CLIENT_SECRET +
                  '&v=' + version;

        $.getJSON(URL).done(function(data) {
          console.log(data)
            var address = data.response.venues[0].location.address

            infoWindow.setContent('<h4>' + marker.title + '</h4>' + '<p>' + address + '</p>');
            infoWindow.open(map, marker)
        }).fail(function() {
            alert("The Foursquare API has an error.");
        }); 
  }
function handleError() {
    alert("The Map could not be loaded at this moment. Please try again");
}
viewModel = function() {
  var pointer = this;

  pointer.places = ko.observableArray(locations);

  pointer.filter = ko.observable('');

  pointer.filterList = ko.computed(function() {
    var filter = pointer.filter().toLowerCase();

    //console.log(filter)

    if (!filter) {
      pointer.places().forEach(function(place) {
        if (place.marker) {
          place.marker.setVisible(true);
        }
      });
      return pointer.places();
    } else {
      return ko.utils.arrayFilter(pointer.places(), function(place) {
        if (place.title.toLowerCase().indexOf(filter) > -1) {
           place.marker.setVisible(true);
          return true;
        } else {
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