var map;
// arra/ Create a new blank array for all the listing markers.

var markers = []; 
//define infowindo 
var infowindows = new google.maps.InfoWindow();

function initMap()
  {
// constrcutrt creates a new map - only center and zoom are required 
map = new google.maps.Map(document.getElementById('map'),{

center: {lat: 24.6926139, lng: 46.6852937},
zoom: 15,
});

mapTypeControl: false

//code for multi location and multi markers info 
//array of object with listing title
        var locations = [
          {title: 'Glowfit Gym', location: {lat: 24.6971, lng: 46.6868}},
          {title: 'Lusin Restaurant', location: {lat: 24.6980, lng: 46.6835}},
          {title: 'Sports Cafe', location: {lat: 24.6991, lng: 46.6893}},
          {title: 'Al Faisaliah Mall', location: {lat: 24.6895, lng: 46.6858}},
          {title: 'King Fahd National Library', location: {lat: 24.6856, lng: 46.6865}}
        ];

// capture south west and north for the corner then we extended as below then tell the map to fit 
var bounds = new google.maps.LatLngBounds();

//loop through the locations for markers
for ( var i = 0; i <locations.length; i++)
{
//get the position from the loc array 
var position = locations[i].location;
var title = locations[i].title;
//create marker
var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: title,

  });

//push marker to markers array 
markers.push(marker);
//when and where to open event listener call infowindo .open 
// Create an onclick event to open an infowindow at each marker.
//this refer to the marker 

marker.addListener ('click', function() {
infoWindoFun(this, infowindows);
});


//extend the boundries ot the map for each marker 

          bounds.extend(markers[i].position); }

 //tell the map fit itself to the bounds

   map.fitBounds(bounds);
}



      function infoWindoFun(marker, infowindow) {
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
