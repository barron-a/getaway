var zipCodeEl = document.getElementById("zipcode");

function getZipCoordinates() {
    // will pull user zip from input field - likely need a search or submit button with listener
    var userZip = zipCodeEl.value.trim();
    var mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + userZip + ".json?access_token=pk.eyJ1IjoiYWRhbWJhcnJvbiIsImEiOiJja2d2dm84aW4wMXA0MzBsODltNjZ5ZzFiIn0.W7Kpov0CjgFZQWXRaFlKzg"

    // fetch coordinates based on zip from map box. Can replace fill URL with 'mapboxUrl' variable when button is enabled
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/94043.json?access_token=pk.eyJ1IjoiYWRhbWJhcnJvbiIsImEiOiJja2d2dm84aW4wMXA0MzBsODltNjZ5ZzFiIn0.W7Kpov0CjgFZQWXRaFlKzg").then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                // define latitude from returned data
                var latitude = data.features[0].center[1];

                //define latitude from returned data
                var longitude = data.features[0].center[0];

                console.log(latitude, longitude);
            });
        } else {
            // insert modal here with error message? (Had trouble getting this to work with Materialize)
        };
    })
}

getZipCoordinates();