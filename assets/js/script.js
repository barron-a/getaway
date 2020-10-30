function getZipCoordinates() {
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/94043.json?access_token=pk.eyJ1IjoiYWRhbWJhcnJvbiIsImEiOiJja2d2dm84aW4wMXA0MzBsODltNjZ5ZzFiIn0.W7Kpov0CjgFZQWXRaFlKzg").then(function(response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        };
    })
}

getZipCoordinates();