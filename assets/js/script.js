$(document).ready(function () {
$('.modal').modal();
$(".parallax").parallax();

var zipCodeEl = document.getElementById("textarea1");
var searchHistory = []
var li = document.createElement("li");
let searchHistorysArray = localStorage.getItem('zipcode')
    ? JSON.parse(localStorage.getItem('zipcode'))
    : []
window.onload = function () {
    searchHistory = JSON.parse(localStorage.getItem('zipcode')); //get data from storage
    if (searchHistory !== null) { //if data exist (todos are in storage)
        searchHistory.forEach(function (v) { //append each element into the dom
            var value = v;
            var li = document.createElement('li'); //2
            var list = document.getElementById('zipCodeOp'); //2
            entry.appendChild(document.createTextNode(value)); //2
            list.appendChild(li); //2
        })
    } else { //if nothing exist in storage, keep todos array empty
        searchHistory = [];
    }
}
// localStorage.getItem('zipcode')
//     ? JSON.parse(localStorage.getItem('zipcode'))
//     : [];

// change function to determine how many miles user selects
// $("#miles-selected").change(function() {
//     meters = $('select#miles-selected').val()*1609.34;
//     console.log(meters);
//     return meters;
//     });

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

function getPointsOfInterest() {

    // will pull user zip from input field - likely need a search or submit button with listener
    var userZip = zipCodeEl.value.trim();
    console.log(userZip);
    var mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + userZip + ".json?access_token=pk.eyJ1IjoiYWRhbWJhcnJvbiIsImEiOiJja2d2dm84aW4wMXA0MzBsODltNjZ5ZzFiIn0.W7Kpov0CjgFZQWXRaFlKzg"

    // fetch coordinates based on zip from map box. Can replace fill URL with 'mapboxUrl' variable when button is enabled

    fetch(mapboxUrl).then(function (response) {
        // mapbox API call

        return response.json()
    }).then(function (data) {
        console.log(data);
        if (data.features[0]) {
            console.log(data);
            var latitude = data.features[0].center[1];
            var longitude = data.features[0].center[0];
            console.log(latitude, longitude);

            var triposoUrl = "https://www.triposo.com/api/20200803/local_highlights.json?latitude=" + latitude + "&longitude=" + longitude + "&max_distance=3000&poi_fields=all&account=ZCUNOA55&token=8pemze46o1tfvvh58e1tskjo5wegfswp"
            return fetch(triposoUrl)

                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);
                    const pois = response.results[0].pois;
                    pois.reverse();
                    for (let index = 0; index < pois.length; index++) {
                        const poi = pois[index];
                        console.log(poi);
                        const url = poi.content && poi.content.attribution[0] && poi.content.attribution[0].url
                            ? poi.content.attribution[0].url
                            : "";
                        const link = url
                            ? `<a href="${url}">Visit Website</a>`
                            : "";
                        const imgUrl = poi.images[0]
                            ? poi.images[0].source_url
                            : "https://sgl-assets.imgix.net/files/article_hero/how-to-plan-trip-guide-aaa-via-magazine-shutterstock_446918872.jpg?w=1440&h=720&crop=faces,edges";
                        const description = poi.content.sections[0].body
                            ? poi.content.sections[0].body
                            : "";
                        const poitemplate = `
                            <div class="row">
                                <div class="col">
                                <div class="card horizontal">
                                    <div class="card-image">
                                    <img alt="" src="${imgUrl}">
                                    <span class="card-title">${poi.name}</span>
                                    </div>
                                    <div class="card-content">
                                    <p>${description}</p>
                                    </div>
                                    <div class="card-action">
                                    ${link}
                                    </div>
                                </div>
                                </div>
                            </div>
                        `;
                        document.querySelector(".container").insertAdjacentHTML("afterend", poitemplate);
                    }
                })
        } else {

            console.log("I am being reached");
           // $(".modal").modal();

            //var instance = M.Modal.getInstance(".modal");
            //instance.open()
            console.log($(".modal"));
            $('#modalError').modal('open');
        }
    });

}


















// function toggleModal() {
//     var instance = M.Modal.getInstance($("#modalError"));
//     instance.open()
// }
//getPointsOfInterest();

//zip code appened
//var btn = document.getElementById("btn")

document.getElementById("zipForm").addEventListener("submit", function (event) {
    event.preventDefault();
    getPointsOfInterest();
    // set item to local storage
    var value = document.getElementById("textarea1").value.trim();
    localStorage.setItem("zipcode", value)
    searchHistory.push(value);


    li.textContent = value;


    // retrieve from local storeage and append in zipcodeop
    document.getElementById("zipCodeOp").append(li);


    //search history
    const data = JSON.parse(localStorage.getItem('zipcode'))
    event.preventDefault()

    zipcodeArray.push(input.value)
    localStorage.setItem('zipcode', JSON.stringify(zipcodeArray))
    data.forEach((value) => {
        li(value)
    })

})







// Get the input field
//var input = document.getElementById("textarea1");

// Execute a function when the user releases a key on the keyboard
// input.addEventListener("keyup", function (event) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//         // Cancel the default action, if needed
//         event.preventDefault();
//         // Trigger the button element with a click
//         document.getElementById("btn").click();
//     }
// });




