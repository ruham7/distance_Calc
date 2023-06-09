var options = {
  componentRestrictions: { country: "ET" },
};
var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

//set map options
var myLatLng = { lat: 8.9806, lng: 38.7578 };
var mapOptions = {
  center: myLatLng,
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};
// checkbox fix(to check a single checkboxß)
function cbChange(obj) {
  var instate = obj.checked;
  var cbs = document.getElementsByName("travelMode");
  for (var i = 0; i < cbs.length; i++) {
    cbs[i].checked = false;
  }
  if (instate) obj.checked = true;
}

//create map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute() {
  var selectedMode = document.querySelector(
    'input[name="travelMode"]:checked'
  ).value;
  //create request
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode[selectedMode], //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.METRIC,
  };

  //pass the request to the route method
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //Get distance and time
      const output = document.querySelector("#output");
      output.innerHTML =
        "<div class='alert-info text-gray'>From: " +
        document.getElementById("from").value +
        ".<br />To: " +
        document.getElementById("to").value +
        "<br /> Distance <i class='fas fa-road'></i> : " +
        result.routes[0].legs[0].distance.text +
        ".<br />Duration <i class='fas fa-hourglass-start'></i> : " +
        result.routes[0].legs[0].duration.text +
        ".</div>";

      //display route
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //center map in Addis ababa
      map.setCenter(myLatLng);

      //show error message
      output.innerHTML =
        "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Unable to calculate distance.</div>";
    }
  });
}
//border-bottom animation maybe?
const input = document.querySelector(".animated-input");
input.addEventListener("focus", () => {
  input.classList.add("focused");
});

input.addEventListener("blur", () => {
  input.classList.remove("focused");
});
