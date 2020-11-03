var zipCodeEl = document.getElementById("textarea1");

// change function to determine how many miles user selects
$("#miles-selected").change(function() {
    meters = $('select#miles-selected').val()*1609.34;
    console.log(meters);
    return meters;
    });

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('select');
//     var instances = M.FormSelect.init(elems);
// });

//note we are going to need this !advanced note: When dynamically changing the value of a textarea with methods like jQuery's
// .val(), you must trigger an autoresize on it afterwords because .val() does not automatically trigger 
// the events we've binded to the textarea.
//$('#textarea1').val('New Text');
//M.textareaAutoResize($('#textarea1'));

// Or with jQuery 

$(document).ready(function () {
    $('select').formSelect();
});

function getZipCoordinates() {

    // will pull user zip from input field - likely need a search or submit button with listener
    var userZip = zipCodeEl.value.trim();
    var mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + userZip + ".json?access_token=pk.eyJ1IjoiYWRhbWJhcnJvbiIsImEiOiJja2d2dm84aW4wMXA0MzBsODltNjZ5ZzFiIn0.W7Kpov0CjgFZQWXRaFlKzg"

    // fetch coordinates based on zip from map box. Can replace fill URL with 'mapboxUrl' variable when button is enabled

    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/94043.json?access_token=pk.eyJ1IjoiYWRhbWJhcnJvbiIsImEiOiJja2d2dm84aW4wMXA0MzBsODltNjZ5ZzFiIn0.W7Kpov0CjgFZQWXRaFlKzg").then(function (response) {
        // mapbox API call
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                var latitude = data.features[0].center[1];
                var longitude = data.features[0].center[0];
                console.log(latitude, longitude);

                var triposoUrl = "https://www.triposo.com/api/20200803/local_highlights.json?latitude=" + latitude + "&longitude=" + longitude + "&max_distance=3000&poi_fields=all&account=ZCUNOA55&token=8pemze46o1tfvvh58e1tskjo5wegfswp"
                return fetch(triposoUrl);
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    console.log(response);
                })
        } else {
            // insert modal here with error message? (Had trouble getting this to work with Materialize)
        };
    })
}

getZipCoordinates();

//zip code appened
var btn = document.getElementById("btn")


var click = btn.onclick = function () {
    // set item to local storage
    var value = document.getElementById("textarea1").value;
    localStorage.setItem("zipcode", value)
    console.log(value)
    // retrieve from local storeage and append in zipcodeop
    document.getElementById("zipCodeOp").innerHTML = localStorage.getItem("zipcode")

}

// Get the input field
var input = document.getElementById("textarea1");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("btn").click();
    }
});

